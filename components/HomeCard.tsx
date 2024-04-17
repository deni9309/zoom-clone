'use client'
import React from 'react';
import Image from "next/image";
import { cn } from "@/lib/utils";

type HomeCardProps = {
  img: string;
  title: string;
  description: string;
  className: 'bg-orange-1' | 'bg-yellow-1' | 'bg-purple-1' | 'bg-blue-1';
  handleClick: () => void;
};

const HomeCard = ({ img, title, description, className, handleClick }: HomeCardProps) => {
  return (
    <div onClick={handleClick}
      className={cn(`flex flex-col justify-between w-full min-h-[260px] xl:max-w-[270px] rounded-[14px] cursor-pointer px-4 py-6`, className)}>
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt={title} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;