'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from 'react-datepicker/';

import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser();
  const streamClient = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!streamClient || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: 'Please, select a date and time for the meeting.' });
        return;
      }

      const id = crypto.randomUUID();
      const call = streamClient.call('default', id);

      if (!call) throw new Error('Failed to create a call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description }
        }
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);  // navigate to this specific room that we just created
      }

      toast({ title: 'Meeting Created!' });
    } catch (error) {
      console.log(error);
      toast({ title: 'Failed to create a meeting!' });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />

      {!callDetails ? (
        /* =========== 1-ST MODAL: SCHEDULE A MEETING =========== */
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px] text-sky-2">Add a description</label>
            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => { setValues({ ...values, description: e.target.value }); }}
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base leading-[22px] text-sky-2">Select date and time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        /* =========== 2-ND MODAL: AFTER SUCCESSFULLY SCHEDULE A MEETING =========== */
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link copied!' });
          }}
        />
      )}

      {/* =========== INSTANT MEETING MODAL =========== */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;