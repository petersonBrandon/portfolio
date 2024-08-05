import React, { ReactNode } from "react";
import Wave from "react-wavify";

interface WrapperProps {
  children: ReactNode;
}

const ToolPageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-700 pt-20">
      <div className="fixed inset-0 z-0 overflow-hidden h-full w-full bottom-0 flex justify-center items-end">
        <Wave
          fill="#111827"
          paused={false}
          style={{ display: "flex", height: "75%" }}
          options={{
            height: 40,
            amplitude: 40,
            speed: 0.15,
            points: 4,
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default ToolPageWrapper;
