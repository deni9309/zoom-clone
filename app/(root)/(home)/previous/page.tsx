import React from 'react';

import CallList from "@/components/CallList";

const Previous = () => {
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Previous</h1>

      <CallList type="ended" />
    </section>
  );
};

export default Previous;