import React, { useEffect, useState } from "react";

export const TotalProducts = () => {
  let [scroll, setScroll] = useState(false);
  useEffect(() => {
    let handleScroll = () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div
      className={`${scroll ? "sticky" : "relative"} w-5/12 top-5 bg-green-800`}
    >
      lorem1000
    </div>
  );
};
