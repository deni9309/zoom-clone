'use client';
import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

/**
 * A custom hook that returns a specific call object by it's id. 
 * @param id the id { string } of the call
 * @returns Object containing the call object itself and a boolean property isCallLoading 
 */
export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const streamClient = useStreamVideoClient();

  useEffect(() => {
    if (!streamClient) return;

    const loadCall = async () => {
      const { calls } = await streamClient.queryCalls({
        filter_conditions: { id },
      });

      if (calls.length > 0) setCall(calls[0]);

      setIsCallLoading(false);
    };

    loadCall();
  }, [streamClient, id]);

  return { call, isCallLoading };
};