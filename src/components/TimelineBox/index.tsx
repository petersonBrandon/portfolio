import React from "react";

interface TimelineBoxProps {
  title: string;
  description: string;
  side: "left" | "right";
}

const TimelineBox: React.FC<TimelineBoxProps> = ({
  title,
  description,
  side = "left",
}) => {
  if (side == "left") {
    return (
      <div className="flex flex-row-reverse md:contents">
        <div className="bg-c12 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md w-full">
          <h3 className="font-semibold text-xl mb-1">{title}</h3>
          <p className="leading-tight">{description}</p>
        </div>
        <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-c2 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-c12 shadow"></div>
        </div>
      </div>
    );
  } else if (side == "right") {
    return (
      <div className="flex md:contents">
        <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-c2 pointer-events-none"></div>
          </div>
          <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-c12 shadow"></div>
        </div>
        <div className="bg-c12 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="leading-tight">{description}</p>
        </div>
      </div>
    );
  }
};

export default TimelineBox;
