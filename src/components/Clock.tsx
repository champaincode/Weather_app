import React, { useEffect, useState } from "react";

let currDate: Date = new Date();
let currTime: string = currDate.toLocaleTimeString();

const dateToday = (): string => {
  let months: string[] = [
    "January",
    "Febuaray",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currDate: Date = new Date();
  let day: string = days[currDate.getDay()];
  let date: number = currDate.getDate();
  let month: string = months[currDate.getMonth()];
  let year: number = currDate.getFullYear();

  return `${day}, ${date} ${month} `;
};

const Clock: React.FC = () => {
  const [timeNow, setTimeNow] = useState<string>(currTime);

  const updateTime = (): void => {
    setTimeNow(new Date().toLocaleTimeString());
  };
  useEffect(() => {
    setInterval(() => {
      updateTime();
    }, 1000);
  }, []);

  return (
    <>
      <div className="dateToday">
        <p>{dateToday()}</p>
        <p className="timenow">{timeNow}</p>
      </div>
    </>
  );
};

export default Clock;
