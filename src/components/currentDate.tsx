// /components/CurrentDate.js
import React from "react";

const CurrentDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return <>{formattedDate}</>;
};

export default CurrentDate;
