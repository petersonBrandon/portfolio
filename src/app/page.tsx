import { ActionBtn } from "@/components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { TbChevronsUpRight, TbUser, TbSend } from "react-icons/tb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brandon Peterson - Full Stack Developer",
  description: "Brandon Peterson's Portfolio",
};

export default function Home() {
  return (
    <>
      <main>
        <section className="flex flex-row mt-20 space-x-10 justify-center items-center max-lg:flex-col max-lg:space-x-0 max-lg:mt-10">
          <div>
            <div className="w-52 h-52 overflow-hidden rounded-full">
              <Image
                src="/BrandonPeterson.jpg"
                alt="Brandon Peterson"
                width={1000}
                height={1000}
                className="object-cover scale-150 translate-y-6"
              />
            </div>
          </div>
          <div>
            <h2 className="text-6xl mb-2 max-lg:mt-10 max-lg:text-5xl">
              Hello There!
            </h2>
            <h1 className="text-5xl max-lg:text-4xl">
              {`I\'m `}
              <Link
                href="/about"
                className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black max-lg:text-4xl"
              >
                Brandon
              </Link>
              {`. I\'m a full stack developer, a blogger, and a life long learner.`}
            </h1>
            <div className="mt-14 flex">
              <ActionBtn
                href="https://blog.brandonpeterson.dev"
                text="Check out my blog"
                target="_blank"
                bouncing={true}
              />
            </div>
          </div>
        </section>
        <section className="flex my-40 justify-center space-x-10 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-10 max-lg:my-10">
          <Link
            href="/about"
            className="flex flex-col w-full items-center p-[5px] animate-text rounded-xl text-center text-2xl bg-gradient-to-r from-teal-500 to-purple-500 hover:scale-110 ease-in-out duration-300"
          >
            <div className="flex flex-col w-full items-center h-full bg-c1 p-10 rounded-lg space-y-5 ">
              <TbUser size={70} />
              <h3 className="">More about me</h3>
            </div>
          </Link>
          <Link
            href="/projects"
            className="flex flex-col w-full items-center p-[5px] animate-text rounded-xl text-center text-2xl bg-gradient-to-r from-c5  to-c11 hover:scale-110 ease-in-out duration-300"
          >
            <div className="flex flex-col w-full items-center h-full bg-c1 p-10 rounded-lg space-y-5">
              <TbSend size={70} />
              <h3 className="">See my projects</h3>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
