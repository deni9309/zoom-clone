import MeetingTypeList from "@/components/MeetingTypeList";
import React from 'react';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex flex-col gap-10 size-full text-white">
      {/* ========= Date Time Section ========== */}
      <div className="w-full h-[300px] rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11 p-10">
          <h2 className="glassmorphism max-w-[270px] text-center text-base font-normal rounded py-2">Upcoming Meeting at: 12:30 PM</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg lg:text-2xl font-medium text-sky-1">{date}</p>
          </div>
        </div>
      </div>

      {/* Meeting cards */}
      <MeetingTypeList />
    </section>
  );
};

export default Home;