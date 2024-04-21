'use client';
import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

/**
 * A custom hook that returns calls as an object with properties:
 * - endedCalls[ ]
 * - upcomingCalls[ ]
 * - callRecordings[ ]
 * - **isLoading** - a boolean property, indicating whether or not the calls are still being fetched
 */
export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const streamClient = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!streamClient || !user?.id) return;

      setIsLoading(true);

      try {
        const { calls } = await streamClient.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          /* 
           query all calls that have 'starts_at' property and: 
           are created by the user OR the user is a member within the call 
          */
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } }
            ]
          }
        });

        setCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [streamClient, user?.id]);

  const now = new Date();

  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now || !!endedAt);   // endedAt is truthy
  });

  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return (startsAt && new Date(startsAt) > now);
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading
  };
};