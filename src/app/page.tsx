"use client";

import { ActionBtn, Quote } from "@/components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  TbUser,
  TbArrowNarrowRight,
  TbTools,
  TbExternalLink,
} from "react-icons/tb";
import axios from "axios";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

interface PostType {
  slug: string;
  parent: string;
  title: string;
  subtitle: string;
  tags: string[];
  date: string;
  author: string;
  read_time: string;
  author_image: string;
  image: string;
  image_credits_text?: string;
  image_credits_link?: string;
  category: string;
}

export default function Home() {
  const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
  useEffect(() => {
    axios
      .get("https://blog.brandonpeterson.dev/api/getPosts?count=5")
      .then(function (response) {
        console.log(response.data.posts);
        setPosts(response.data.posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const showLoading = () => {
    return (
      <div className="w-full flex justify-center items-center">
        <GridLoader color="#ffff" loading={true} />
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Brandon Peterson - Full Stack Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_new.ico" />
        <meta
          name="title"
          property="og:title"
          content="Brandon Peterson - Full Stack Developer"
        />
        <meta property="og:type" content="Website" />
        <meta
          name="image"
          property="og:image"
          content="https://brandonpeterson.dev/Logo Solid.png"
        />
        <meta name="author" content="Brandon Peterson" />
        <meta name="twitter:card" content="Home" />
        <meta name="twitter:site" content="@brandon_p_dev" />
        <meta
          name="twitter:title"
          content="Brandon Peterson - Full Stack Developer"
        />
        <meta
          name="twitter:image"
          content="https://brandonpeterson.dev/Logo Solid.png"
        />
      </Head>
      <main className="space-y-20">
        <section className="flex flex-row mt-20 space-x-10 justify-center items-center max-lg:flex-col max-lg:space-x-0 max-lg:mt-10">
          <div>
            <div className="w-52 h-52 overflow-hidden rounded-full shadow-2xl">
              <Image
                src="/BrandonPeterson.webp"
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
        <Quote
          quote="Life is like riding a bicycle. To keep your balance, you must keep moving."
          author="Albert Einstein"
        />
        <section className="flex my-10 justify-center space-x-10 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-10 max-lg:my-10">
          <Link
            href="/about"
            className="group flex h-full flex-col w-full items-center p-[5px] animate-text rounded-xl text-center text-2xl bg-gradient-to-r from-teal-500 to-purple-500"
          >
            <div className="flex w-full items-center justify-center bg-c1 p-5 rounded-lg space-x-5">
              <div className="flex w-full items-center justify-center space-x-5 group-hover:-translate-x-6 ease-in-out duration-300">
                <TbUser className="w-10 h-10" />
                <h3 className="">More about me</h3>
              </div>
              <div className="absolute translate-x-28 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                <TbArrowNarrowRight className="w-10 h-10" />
              </div>
            </div>
          </Link>
          <Link
            href="/projects"
            className="group flex h-full flex-col w-full items-center p-[5px] animate-text rounded-xl text-center text-2xl bg-gradient-to-r from-c5  to-c11"
          >
            <div className="flex w-full items-center justify-center bg-c1 p-5 rounded-lg space-x-5">
              <div className="flex w-full items-center justify-center space-x-5 group-hover:-translate-x-6 ease-in-out duration-300">
                <TbTools className="w-10 h-10" />
                <h3 className="">See my projects</h3>
              </div>
              <div className="absolute translate-x-28 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                <TbArrowNarrowRight className="w-10 h-10" />
              </div>
            </div>
          </Link>
        </section>
        <section className="flex flex-col space-y-10">
          <h3 className="text-3xl">Recent Blog Posts</h3>
          <div className="flex flex-col">
            {posts != undefined
              ? posts.map((post: PostType) => {
                  return (
                    <Link
                      href={`https://blog.brandonpeterson.dev/${post.category}/${post.title}`}
                      key={post.title}
                      target="_blank"
                      className="w-full border-4 bg-opacity-50 backdrop-blur-md border-white my-3 rounded-xl max-lg:w-full overflow-hidden group"
                    >
                      <div className="flex max-lg:flex-col">
                        <div className="max-h-96 w-4/12 overflow-hidden flex flex-col items-center justify-center max-lg:w-full aspect-video">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full group-hover:scale-125 ease-in-out duration-300"
                          />
                        </div>
                        <section className="flex justify-between items-start p-5 w-full space-x-3">
                          <div className="flex flex-col space-y-3 justify-between w-full max-lg:flex-col">
                            <div>
                              <h1 className="text-2xl mr-4">{post.title}</h1>
                              <p className="mt-2 text-sm opacity-75">{`${post.read_time} - ${post.date}`}</p>
                            </div>
                            <div>
                              <h2 className="text-md mr-4">{post.subtitle}</h2>
                            </div>
                            <div className="flex justify-between w-full">
                              {post.image_credits_link != null ? (
                                <div
                                  className="w-2/5 pl-5 pr-5 text-right text-xs pt-1"
                                  onClick={() =>
                                    window.open(post.image_credits_link)
                                  }
                                >
                                  {post.image_credits_text}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="opacity-0 -translate-x-12 group-hover:-translate-x-0 group-hover:opacity-100 ease-in-out duration-300 h-full flex justify-center items-center max-lg:hidden">
                            <TbExternalLink className="w-10 h-10" />
                          </div>
                        </section>
                      </div>
                    </Link>
                  );
                })
              : showLoading()}
          </div>
        </section>
      </main>
    </>
  );
}
