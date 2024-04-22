'use client';
import React from 'react';
import Image from "next/image";

import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";

type MeetingCardProps = {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
};

const MeetingCard = ({
  title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex flex-col justify-between w-full xl:max-w-[568px] min-h-[258px] bg-dark-1 rounded-[14px] px-5 py-8">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold max-w-72 truncate">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className='relative flex justify-center'>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn('rounded-full', { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="absolute flex-center left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button className="rounded bg-blue-1 px-6"
              onClick={handleClick}
            >
              {buttonIcon1 && (<Image src={buttonIcon1} alt="feature" width={20} height={20} />)}
              &nbsp; {buttonText}
            </Button>
            <Button className="bg-dark-4 px-6"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({ title: 'Link Copied' });
              }}
            >
              <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;