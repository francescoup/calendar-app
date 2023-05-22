import React, { useState } from "react";
import { dayName, days } from "../Data/TimeSlot";
import { AnimatePresence, motion } from "framer-motion";
import {
  format,
  startOfToday,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  getDay,
  isSunday,
  isSameDay,
  parseISO,
} from "date-fns";
import ModalLayout from "./ModalLayout";
import { useGlobalContext } from "../Context";
// let today = startOfToday()
// export let newDays = eachDayOfInterval({start: startOfMonth(today), end:endOfMonth(today)})

const Calendar = () => {
  const {
    newDays,
    dayCurrentMonths,
    days,
    weekInterval,
    dayCurrentWeek,
    el,
    dayFormat,
    meeting,
    isDetailsOpen,
    setIsDetailsOpen,
    index,
    removeEvents,
    event,
    setEvent,
  } = useGlobalContext();
  let today = startOfToday();
  let colstart = [
    "",
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
  ];
  // let newDays = eachDayOfInterval({start: startOfMonth(today), end:endOfWeek(endOfMonth(today))})
  function passData(data) {
    setEvent(data);
    setIsDetailsOpen(!isDetailsOpen);
  }
  return (
    <div className="container overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`calendar-${index}`}
          initial={{ x: "-100vw" }}
          animate={{ x: "0" }}
          exit={{ x: "100vw" }}
          className={
            el !== "Giorni" ? "grid grid-cols-7" : "grid grid-cols-1 gap-4"
          }
        >
          {el !== "Giorni"
            ? dayName.map((dayName, i) => {
                return (
                  <div
                    key={`giorni-${i}`}
                    className="text-left mb-2 pl-2 truncate "
                  >
                    <h3 className="lg:hidden md:hidden">
                      {dayName.substring(0, 1)}
                    </h3>
                    <h3 className="max-sm:hidden">{dayName}</h3>
                  </div>
                );
              })
            : ""}
          {days.map((day, i) => {
            return el !== "Giorni" ? (
              <div
                key={`settimane${i}`}
                className={` ${el === "Settimane" ? "h-96" : "h-24"} ${
                  isSameMonth(day, dayCurrentMonths, dayCurrentWeek)
                    ? "text-slate-900"
                    : "bg-slate-100"
                } border-t pt-2 pl-2 flex flex-col items-start justify-start`}
              >
                <div
                  key={`giorno-${i}`}
                  className={`${
                    isSameMonth(day, dayCurrentMonths, dayCurrentWeek)
                      ? "text-slate-700"
                      : "text-slate-600"
                  } ${i === 0 && colstart[getDay(day)]}  
              
               flex justify-center items-center rounded-md`}
                  datadetails={format(day, "yyyy-MM-dd")}
                >
                  {format(day, "d")}
                </div>
                <div className="flex flex-col items-start w-full gap-1">
                  {meeting &&
                    meeting
                      .filter((singleMeeting) =>
                        isSameDay(parseISO(singleMeeting.time), day)
                      )
                      .map((events, i) => {
                        return (
                          <div
                            className={`${events.color} w-full text-sm shadow-lg px-2 flex items-center justify-start`}
                          >
                            <button key={i} onClick={() => passData(events)}>
                              {events.title}
                            </button>
                          </div>
                        );
                      })}
                </div>
              </div>
            ) : (
              <div
                key={`singleday-${i}`}
                className="border-t h-96 flex flex-col items-center justify-center gap-4"
              >
                <div
                  key={`days-${i}`}
                  className={`${
                    isSameMonth(day, dayCurrentMonths, dayCurrentWeek)
                      ? "text-slate-900"
                      : "text-slate-200"
                  } ${
                    isSunday(day) && "bg-red-200"
                  } flex justify-center items-center rounded-md`}
                  datadetails={format(day, "dd-MM-yyyy")}
                >
                  {format(day, "EEEE d MMM")}
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                  {meeting &&
                    meeting
                      .filter((singleMeeting) =>
                        isSameDay(parseISO(singleMeeting.time), day)
                      )
                      .map((events, i) => {
                        return (
                          <div
                            className={`${events.color} w-full text-sm shadow-lg px-2 flex items-center justify-start`}
                          >
                            <button key={i} onClick={() => passData(events)}>
                              {events.title}
                            </button>
                          </div>
                        );
                      })}
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
