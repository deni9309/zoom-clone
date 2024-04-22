'use client';
import React from 'react';
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useRouter } from "next/navigation";

const Table = ({ title, description }: { title: string; description: string; }) => {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-2 ">
      <h1 className="text-base lg:text-xl text-sky-1 font-medium xl:min-w-32">{title}:</h1>
      <h1 className="truncate text-sm lg:text-xl font-bold max-sm:max-w-[320px]">{description}</h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;

  const streamClient = useStreamVideoClient();
  const { call } = useGetCallById(meetingId!);

  const { toast } = useToast();
  const router = useRouter();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!streamClient || !user) return;

    /** if the 'call' doesn't exist create a new one */
    if (!call) {                
      const newCall = streamClient.call('default', meetingId!);
      await newCall.getOrCreate({
        data: { starts_at: new Date().toISOString() }
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex flex-col w-full xl:max-w-[900px] gap-8">
        <Table title="Topic" description={`${user?.username}'s meeting room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      <div className="flex gap-5">
        <Button onClick={startRoom} className="bg-blue-1">
          Start Meeting
        </Button>
        <Button className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;