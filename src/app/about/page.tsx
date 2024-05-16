import { ActionBtn, Quote, TimelineBox } from "@/components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbCamper } from "react-icons/tb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Brandon Peterson - About Me",
};

const page = () => {
  return (
    <>
      <main>
        <section className="flex flex-col items-center mt-5">
          <h1 className="text-5xl">About Me</h1>
        </section>

        <section className="mt-10">
          <p className="text-xl">
            {`Hello there! I\'m Brandon, a passionate software engineer and
            lifelong learner. My expertise lies in creating seamless user
            experiences through meticulous testing and process optimization. Currently,
            I work as a senior software automation test engineer contractor at `}
            <Link
              href="https://www.masterclass.com/"
              target="_blank"
              className="border-b-2 border-c11 hover:text-c11 ease-in-out duration-300"
            >
              MasterClass
            </Link>
            {`, ensuring product integrity through automated testing.`}
          </p>
          <div className="flex flex-row space-x-10 mt-10 max-lg:space-x-0">
            {/* <Image
              src="/Family.webp"
              alt="Family"
              width={1000}
              height={1000}
              className="w-72 h-auto rounded-xl max-lg:hidden"
            /> */}
            <div className="text-xl flex flex-col space-y-10">
              <p>
                {`I hold a Bachelor\'s degree in Software Engineering from `}
                <Link
                  href="https://www.byui.edu/"
                  target="_blank"
                  className="border-b-2 border-c11 hover:text-c11 ease-in-out duration-300"
                >
                  Brigham Young University - Idaho
                </Link>
                {` and am pursuing my graduate studies. Additionally, I am the lead
                developer at Mt Zion Enterprises LLC, where I founded and
                developed the `}
                <Link
                  href="https://www.levelupgoaltracker.com/"
                  target="_blank"
                  className="border-b-2 border-c11 hover:text-c11 ease-in-out duration-300"
                >
                  Level Up Goal Tracker
                </Link>
                {` application.`}
              </p>
              <p>
                {`Beyond my professional commitments, I contribute to my `}
                <Link
                  href="https://blog.brandonpeterson.dev/"
                  target="_blank"
                  className="border-b-2 border-c11 hover:text-c11 ease-in-out duration-300"
                >
                  Blog
                </Link>
                {`, where I explore various technologies. I also am constantly learning new tools, and skills.
                Whether it is learning a new algorithm patern, language, or making small projects, I am 
                always increasing my skills in software engineering.`}
              </p>
              <p>
                {`You can discover the projects I\'m currently working on by
                checking out my `}
                <Link
                  href="https://github.com/petersonBrandon"
                  target="_blank"
                  className="border-b-2 border-c11 hover:text-c11 ease-in-out duration-300"
                >
                  GitHub profile
                </Link>
                {`.`}
              </p>
              {/* <div className="flex flex-row w-full justify-end">
                <ActionBtn
                  href="Brandon Peterson.pdf"
                  text="Check out my resume"
                  target="_blank"
                  download={true}
                />
              </div> */}
            </div>
          </div>
        </section>

        <div className="w-full flex flex-row items-center justify-center my-10 space-x-1">
          <p>___</p>
          <TbCamper size={30} />
          <p>___</p>
        </div>

        <section className="flex flex-col items-center">
          <h2 className="text-4xl text-center">My Coding Journey</h2>
          <Quote
            quote="The journey of a thousand miles begins with one step.g"
            author="Lao Tzu"
          />
          <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50 mt-10">
            <TimelineBox
              title="Current"
              description="I blog about the latest technical topics I've been working on and have been working on a simple weather app with react native that is currently available in the google play store."
              side="left"
            />
            <TimelineBox
              title="Jan 2023"
              description="I began deveoping the Level Up Goal Tracker app with React Native."
              side="right"
            />
            <TimelineBox
              title="Dec 2022"
              description={`I graduated with a Bachelor\'s degree in Software Engineering from Brigham Young University - Idaho.`}
              side="left"
            />
            <TimelineBox
              title="Feb 2022"
              description="I began working for MasterClass as a software automation test engineer contractor."
              side="left"
            />
            <TimelineBox
              title="Jan 2022"
              description="I took some project management courses and backend development focused courses."
              side="left"
            />
            <TimelineBox
              title="Jul 2021"
              description="I took courses to further understand JavaScript and algorithm design."
              side="right"
            />
            <TimelineBox
              title="Jan 2021"
              description="I began developing a developer blog using NEXT.js, Redux, and MongoDB. (This was precursor to my BitBytes Developer Blog.)"
              side="left"
            />
            <TimelineBox
              title="Jun 2020"
              description="I began working with NEXT.js and start to learn React.js."
              side="right"
            />
            <TimelineBox
              title="Jan 2020"
              description="I started learning about full stack development, databases, and create a demo store website using Node.js, Express.js, and MongoDB."
              side="right"
            />
            <TimelineBox
              title="August 2019"
              description="I began learning about data structures and algorithms in C++, learning the how to create highly efficient and flexible applicaitons."
              side="left"
            />
            <TimelineBox
              title="July 2019"
              description="After my first C++ course, I took another course on object-oriented programming and learned the value of OOP."
              side="left"
            />
            <TimelineBox
              title="Jan 2019"
              description="I took my first C++ course that introduced me procedural programming and taught me a greater passion for programming."
              side="left"
            />
            <TimelineBox
              title="2015"
              description="I began working HTML and CSS, with a small bit of JavaScript and started learning web development."
              side="right"
            />
            <TimelineBox
              title="2013"
              description="I started working with and programming Lego® Minstorms® robots. I also competed in Lego® Minstorms® competitions."
              side="left"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
