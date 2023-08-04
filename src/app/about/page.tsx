import { ActionBtn, TimelineBox } from "@/components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbCamper } from "react-icons/tb";

const page = () => {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />

        <meta name="title" property="og:title" content="About Me" />
        <meta property="og:type" content="Website" />
        <meta
          name="image"
          property="og:image"
          content="https://www.brandonpeterson.dev/Logo%20Solid.png"
        />
        <meta
          name="description"
          property="og:description"
          content="Brandon Peterson - About"
        />
        <meta name="author" content="Brandon Peterson" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@DevBrandon318" />
        <meta name="twitter:title" content="About Me" />
        <meta name="twitter:description" content="Brandon Peterson - About" />
        <meta
          name="twitter:image"
          content="https://www.brandonpeterson.dev/Logo%20Solid.png"
        />
      </Head>
      <main>
        <section className="flex flex-col items-center mt-5">
          <h1 className="text-5xl">About Me</h1>
        </section>

        <section className="mt-10">
          <p className="text-xl">
            {`Hello there! I\'m Brandon, a passionate full-stack developer and
            lifelong learner. My expertise lies in creating seamless user
            experiences and turning ideas into reality through code. Currently,
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
            <Image
              src="/Family.jpg"
              alt="Family"
              width={1000}
              height={1000}
              className="w-72 h-auto rounded-xl max-lg:hidden"
            />
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
                {`Beyond my professional commitments, I actively contribute to the `}
                <Link
                  href="https://blog.brandonpeterson.dev/"
                  target="_blank"
                  className="border-b-2 border-c11 hover:text-c11 ease-in-out duration-300"
                >
                  BitBytes Developer Blog
                </Link>
                {`, exploring various technologies, and I\'m
                also working on MinUI, a minimalist UI library to offer a simple
                and responsive interface.`}
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
              <div className="flex flex-row w-full justify-end">
                <ActionBtn
                  href="Brandon Peterson.pdf"
                  text="Check out my resume"
                  target="_blank"
                  download={true}
                />
              </div>
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
          <div className="flex flex-col justify-center items-center opacity-50 mt-5">
            <h3 className="text-lg text-center">
              "The journey of a thousand miles begins with one step."
            </h3>
            <h4>- Lao Tzu</h4>
          </div>
          <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50 mt-10">
            <TimelineBox
              title="Current"
              description="I blog about the latest technical topics I've been working on, am currently developing a react UI library, and have been working on a simple weather app with react native that should be published to google play later this month."
              side="left"
            />
            <TimelineBox
              title="Jan 2023"
              description="I begin deveoping the Level Up Goal Tracker app with React Native."
              side="right"
            />
            <TimelineBox
              title="Dec 2022"
              description="I graduate with a Bachelor\'s degree in Software Engineering from Brigham Young University - Idaho."
              side="left"
            />
            <TimelineBox
              title="Feb 2022"
              description="I begin working for MasterClass as a software automation test engineer contractor."
              side="left"
            />
            <TimelineBox
              title="Jan 2022"
              description="I take some project management courses and backend development focused courses."
              side="left"
            />
            <TimelineBox
              title="Jul 2021"
              description="I take courses to further understand JavaScript and algorithm design."
              side="right"
            />
            <TimelineBox
              title="Jan 2021"
              description="I begin developing a developer blog using NEXT.js, Redux, and MongoDB. (This was precursor to my BitBytes Developer Blog.)"
              side="left"
            />
            <TimelineBox
              title="Jun 2020"
              description="I begin working with NEXT.js and start to learn React.js."
              side="right"
            />
            <TimelineBox
              title="Jan 2020"
              description="I learn about full stack development, databases, and create a demo store website using Node.js, Express.js, and MongoDB."
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
              description="I take my first C++ course that introduced me procedural programming and taught me a greater passion for programming."
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
