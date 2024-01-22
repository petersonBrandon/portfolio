import React from "react";

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <div className="flex flex-col justify-center items-center opacity-50 my-5">
      <h3 className="text-lg text-center">{`\"${quote}\"`}</h3>
      <h4>- {author}</h4>
    </div>
  );
};

export default Quote;
