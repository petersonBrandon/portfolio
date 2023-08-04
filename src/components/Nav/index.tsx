"use client";

import React from "react";
import NavBtn from "./NavBtn";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CgMenuGridO, CgClose } from "react-icons/cg";

const NavBar = () => {
  const pathname = usePathname();

  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <nav className="w-screen h-20 bg-opacity-50 backdrop-blur-lg fixed top-0 flex flex-row justify-center items-center z-50">
      <section className="w-3/5 flex flex-row justify-between max-lg:w-11/12">
        <div onClick={() => setMenuVisible(false)} className="max-lg:z-50">
          <Link href="/" className="hover:scale-110 ease-in-out duration-300">
            <Image
              src={"/Logo.svg"}
              alt="B Logo"
              width={500}
              height={500}
              className="h-16 w-auto"
            />
          </Link>
        </div>
        <div
          onClick={() => setMenuVisible(false)}
          className={`flex max-lg:absolute max-lg:w-screen max-lg:top-0 max-lg:left-0 justify-center max-lg:h-screen max-lg:items-start z-40 ${
            menuVisible
              ? "max-lg:translate-y-0"
              : "max-lg:-translate-y-y-complete"
          } ease-in-out duration-300 transition max-lg:bg-c1`}
        >
          <div
            className={`flex flex-row space-x-10 justify-center items-center max-lg:flex-col max-lg:space-x-0 max-lg:space-y-8 ease-in-out duration-300 transition max-lg:mt-24 max-lg:w-4/5 max-lg:backdrop-blur-3xl max-lg:p-10 max-lg:rounded-3xl max-lg:ring-2 max-lg:ring-c11 max-lg:bg-c1 max-lg:bg-opacity-50`}
          >
            <NavBtn title="Home" href="/" current={pathname === "/"} />
            <NavBtn
              title="About"
              href="/about"
              current={pathname === "/about"}
            />
            <NavBtn
              title="Projects"
              href="/projects"
              current={pathname === "/projects"}
            />
            <NavBtn title="Blog" href="https://blog.brandonpeterson.dev" />
            <Link
              download={true}
              href={"Brandon Peterson.pdf"}
              target="_blank"
              className="text-lg rounded-full font-bold hover:opacity-100 hover:text-white px-5 py-2 hover:bg-c2 ring-4 ring-inset ring-c2 ease-in-out duration-300 max-lg:w-full max-lg:text-center"
            >
              Resume
            </Link>
          </div>
        </div>
        <div className="w-16 max-lg:w-auto z-50 relative">
          <div className="hidden max-lg:flex justify-center items-center h-full w-16">
            <button onClick={() => setMenuVisible(!menuVisible)}>
              {menuVisible ? <CgClose size={40} /> : <CgMenuGridO size={40} />}
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default NavBar;
