import Link from "next/link";
import React from "react";
import { TbChevronsUpRight } from "react-icons/tb";

interface ActionBtnProps {
  href: string;
  text: string;
  iconSize?: number;
  bouncing?: boolean;
  target?: string;
  download?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  href,
  text,
  iconSize = 20,
  bouncing = false,
  target = "_self",
  download = false,
}) => {
  return (
    <Link
      href={href}
      download={download}
      target={target}
      className={`${
        bouncing ? "animate-bounce" : ""
      } px-5 py-3 bg-white text-black rounded-full flex flex-row justify-center items-center space-x-3 hover:text-white hover:bg-c2 ease-in-out duration-300 max-lg:w-full max-lg:px-3`}
    >
      <div>{text}</div>
      <TbChevronsUpRight size={iconSize} />
    </Link>
  );
};

export default ActionBtn;
