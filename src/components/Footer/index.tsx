// app/Footer.tsx
import Link from "next/link";
import React from "react";
import { TbCopyright, TbBrandLinkedin, TbBrandGithub } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <TbCopyright size={20} className="mr-2" />
            <p>Brandon Peterson {new Date().getFullYear()}</p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://www.linkedin.com/in/brandon-peterson-194572198/"
              target="_blank"
              className="hover:text-blue-400 transition duration-300"
            >
              <TbBrandLinkedin size={30} />
            </Link>
            <Link
              href="https://github.com/petersonBrandon"
              target="_blank"
              className="hover:text-gray-400 transition duration-300"
            >
              <TbBrandGithub size={30} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
