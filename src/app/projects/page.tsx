import { ActionBtn, Quote } from "@/components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbChevronsUpRight } from "react-icons/tb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Brandon Peterson - Projects",
};

const page = () => {
  return (
    <>
      <main className="flex flex-col items-center mt-5">
        <h1 className="text-5xl">Projects</h1>
        <Quote
          quote="The only way to do great work is to love what you do."
          author="Steve Jobs"
        />
        <section className="flex flex-row justify-center items-end rounded-xl bg-gradient-to-b from-cyan-600 via-c2 to-c1 bg-1.5 text-2xl w-full mt-10 p-8 space-x-5 my-5 max-lg:flex-col max-lg:space-x-0 max-lg:items-center">
          <Image
            src="/Projects/BitBytes Logo.webp"
            alt="BitBytes Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
          <div className="flex flex-col space-y-5">
            <p>
              BitBytes is a developer blog site that I have created, post on,
              and continue to improve.
            </p>
            <div className="flex justify-end text-lg">
              <ActionBtn
                href="https://blog.brandonpeterson.dev/"
                target="_blank"
                text="Check out BitBytes"
                iconSize={30}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-row justify-center items-end rounded-xl bg-gradient-to-b from-c8 via-c4 to-c1 bg-1.5 text-2xl w-full mt-20 p-8 space-x-5 my-5 max-lg:flex-col-reverse max-lg:space-x-0 max-lg:items-center">
          <div className="flex flex-col space-y-5">
            <p>
              Level Up Goal Tracker is a mobile app that I developed to better
              track goals and see progress as goals are completed.
            </p>
            <div className="flex justify-start text-lg">
              <ActionBtn
                href="https://www.levelupgoaltracker.com/"
                target="_blank"
                text="Check out Level Up"
                iconSize={30}
              />
            </div>
          </div>
          <Image
            src="/Projects/Logo Full Dark.webp"
            alt="Level Up Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
        </section>
        <section className="flex flex-row justify-center items-end rounded-xl bg-gradient-to-b from-lime-500 via-green-700 to-c1 bg-1.5 text-2xl w-full mt-20 p-8 space-x-5 my-5 max-lg:flex-col max-lg:space-x-0 max-lg:items-center">
          <Image
            src="/Projects/Simply Weather.webp"
            alt="Simply Weather Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
          <div className="flex flex-col space-y-5">
            <p>
              Simply Weather is a free open source weather app that I have
              created as I was tired of seeing ads in other weather apps.
            </p>
            <div className="flex justify-end text-lg">
              <ActionBtn
                href="https://github.com/petersonBrandon/simply-weather"
                target="_blank"
                text="See Simply Weather"
                iconSize={30}
              />
            </div>
          </div>
        </section>
        {/* <section className="flex flex-row justify-center items-end rounded-xl bg-gradient-to-b from-red-600 via-c4 to-c1 bg-1.5 text-2xl w-full mt-20 p-8 space-x-5 my-5 max-lg:flex-col-reverse max-lg:spa max-lg:items-center">
          <div className="flex flex-col space-y-5">
            <p>
              MinUI is a minimalist focused React UI library that I am working
              on. It is still currently in early development.
            </p>
            <div className="flex justify-start text-lg">
              <ActionBtn
                href="https://github.com/petersonBrandon/MinUI"
                target="_blank"
                text="Check out MinUI"
                iconSize={30}
              />
            </div>
          </div>
          <Image
            src="/Projects/MinUI.webp"
            alt="MinUI Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
        </section> */}
      </main>
    </>
  );
};

export default page;
