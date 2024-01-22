import Link from "next/link";
import React from "react";
import {
  TbCopyright,
  TbBrandLinkedin,
  TbBrandGithub,
  TbBrandYoutube,
} from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <hr className="mt-20 opacity-50" />
      <footer className="flex flex-row justify-between mt-10 mb-5">
        <div className="flex flex-row justify-center items-center space-x-2 opacity-50">
          <TbCopyright size={20} />
          <p>Brandon Peterson 2024</p>
        </div>
        <div className="flex flex-row justify-center items-center space-x-5">
          <Link
            href="https://www.linkedin.com/in/brandon-peterson-194572198/"
            target="_blank"
            className="opacity-50 hover:opacity-100 ease-in-out duration-300"
          >
            <TbBrandLinkedin size={30} />
          </Link>
          <Link
            href="https://github.com/petersonBrandon"
            target="_blank"
            className="opacity-50 hover:opacity-100 ease-in-out duration-300"
          >
            <TbBrandGithub size={30} />
          </Link>
          {/* <Link
            href="/"
            target="_blank"
            className="opacity-50 hover:opacity-100 ease-in-out duration-300"
          >
            <TbBrandYoutube size={30} />
          </Link> */}
          {/* <Link
            href="https://twitter.com/brandon_p_dev"
            target="_blank"
            className="opacity-50 hover:opacity-100 ease-in-out duration-300"
          >
            <RiTwitterXLine size={30} />
          </Link> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
