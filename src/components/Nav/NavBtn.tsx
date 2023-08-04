import Link from "next/link";
import React from "react";

interface NavBtnProps {
  title?: string;
  href: string;
  current?: boolean;
}

const NavBtn: React.FC<NavBtnProps> = ({ title, href, current }) => {
  return (
    <Link
      href={href}
      className={`text-lg opacity-75 font-bold hover:opacity-100 hover:text-white ease-in-out duration-300
      ${current ? "text-c11 !opacity-100" : ""}
      px-5 py-2 rounded-full hover:bg-c2 max-lg:w-full max-lg:text-center`}
    >
      {title}
    </Link>
  );
};

export default NavBtn;
