import Link from "next/link";
import React from "react";

interface NavBtnProps {
  title?: string;
  href: string;
  current?: boolean;
  target?: string;
  onClick?: () => void;
}

const NavBtn: React.FC<NavBtnProps> = ({
  title,
  href,
  current,
  target,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={target == undefined ? "" : target}
      className={`text-lg opacity-75 font-bold hover:opacity-100 hover:text-white ease-in-out duration-300
      ${current ? "text-c11 !opacity-100" : ""}
      px-5 py-2 rounded-full hover:bg-c2 max-lg:w-full max-lg:border-b-2 max-lg:rounded-none max-lg:px-0`}
    >
      {title}
    </Link>
  );
};

export default NavBtn;
