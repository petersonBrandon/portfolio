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
        <section className="flex flex-row justify-center items-center rounded-xl bg-white text-black bg-1.5 text-2xl max-lg:text-lg w-full mt-20 p-8 space-x-10 my-5 max-lg:flex-col max-lg:space-x-0 max-lg:items-center">
          <Image
            src="/Projects/Level Up logo.png"
            alt="Level Up Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
          <div className="flex flex-col space-y-5">
            <p>
              {`I\'m currently collaborating on the design and deployment of Level
              Up Goal Tracker—an app aimed at simplifying goal tracking and
              progress visualization, with built-in sharing capabilities among
              peers. My involvement began with designing and developing the
              initial prototype as a proof of concept. Presently, we\'re focused
              on rebranding for the official product launch.`}
            </p>
            <div className="flex justify-end text-lg">
              <ActionBtn
                href="https://www.levelupgoaltracker.com/"
                target="_blank"
                text="Check out Level Up"
                iconSize={30}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-row justify-center items-center rounded-xl bg-white text-black bg-1.5 text-2xl max-lg:text-lg w-full mt-20 p-8 space-x-10 my-5 max-lg:flex-col max-lg:space-x-0 max-lg:items-center">
          <Image
            src="/Projects/Stash Logo.png"
            alt="Stash Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
          <div className="flex flex-col space-y-5">
            <p>
              Stash is my ongoing project—a dynamic blog site I crafted,
              regularly contribute to, and persistently refine.
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
        <section className="flex flex-row justify-center items-center rounded-xl bg-white text-black bg-1.5 text-2xl max-lg:text-lg w-full mt-20 p-8 space-x-10 my-5 max-lg:flex-col max-lg:space-x-0 max-lg:items-center">
          <Image
            src="/Projects/Simply Weather.webp"
            alt="Simply Weather Logo"
            width={1000}
            height={1000}
            className="w-64 h-auto scale-125"
          />
          <div className="flex flex-col space-y-5">
            <p>
              Simply Weather is a complimentary, open-source weather application
              I developed to delve into React Native.
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
      </main>
    </>
  );
};

export default page;
