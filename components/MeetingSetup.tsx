'use client';
import React, { useEffect, useState } from 'react';
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";

import { Button } from "./ui/button";

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void; }) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();
  if (!call) {
    throw new Error('useCall must be used within StreamCall component');
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }

  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full h-screen text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex justify-center items-start gap-3 h-16">
        <label className="flex justify-center items-center gap-2 font-medium">
          <input type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with microphone and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;