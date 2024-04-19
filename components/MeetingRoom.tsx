'use client';
import { cn } from "@/lib/utils";
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { useState } from 'react';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'left'} />;
      default:
        return <SpeakerLayout participantsBarPosition={'right'} />;   // speaker-left
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden text-white pt-4">
      <div className="relative flex justify-center items-center size-full">
        <div className="flex items-center size-full max-w-[1000px]">
          <CallLayout />
        </div>
        { /* Call Participants */}
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed flex justify-center items-center gap-5 w-full bottom-0">
        <CallControls />
      </div>
    </section>
  );
};

export default MeetingRoom;