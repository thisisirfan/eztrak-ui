import React from "react";

export const Heading = ({title="", description="", titleClass="", descriptionClass="", containerClass=""}) => {
  return (
    <div className={`flex flex-col items-center gap-5 ${containerClass}`}>
      <h2 className={` text-4xl  font-mplus  font-semibold tracking-normal ${titleClass}`}>
       {title}
      </h2>
      <h3 className={` text-2xl  font-mplus text-secondary  tracking-normal ${descriptionClass}`}>
       {description}
      </h3>
    </div>
  );
};