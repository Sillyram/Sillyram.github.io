"use client";
import { useState, useEffect, useMemo } from "react";

export default function Countdown() {
  const targetDate = useMemo(() => new Date("September 5, 2023 00:00:00"), []);
  const [countdown, setCountdown] = useState(0);
  Math.floor((targetDate - new Date()) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clientCountdown = Math.floor((targetDate - new Date()) / 1000);
    setCountdown(clientCountdown);
  }, [targetDate]);

  return (
    <>
      <div>
        {countdown > 0 ? (
          <p className="text-2xl text-gray-500" id="checkin">
            This webpage is still under construction. Check back in:
            <br />
            <span className="text-blurple">
              {" "}
              {Math.floor(countdown / 86400)} days,{" "}
              {Math.floor((countdown % 86400) / 3600)} hours,{" "}
              {Math.floor((countdown % 3600) / 60)} minutes, and{" "}
              {countdown % 60} seconds!
            </span>
          </p>
        ) : (
          <p className="text-2xl text-gray-500" id="checkin">
            The webpage is now live!
          </p>
        )}
      </div>
    </>
  );
}
