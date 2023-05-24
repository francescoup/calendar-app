import React, { useState } from "react";
import { dayName } from "../Data/TimeSlot";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useMobile } from "../CostumHooks/useMobile";
import {
  format,
  startOfToday,
  isSameMonth,
  getDay,
  isSunday,
  isSameDay,
  parseISO,
} from "date-fns";

import { useGlobalContext } from "../Context";
const maxWidht = "100vh";
const variants = {
  enter: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1400 : -1400,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1400 : -1400,
    opacity: 0,
  }),
};

const Calendar = () => {
  const {
    dayCurrentMonths,
    days,
    dayCurrentWeek,
    el,
    meeting,
    isDetailsOpen,
    setIsDetailsOpen,
    index,
    setEvent,
    nextMonths,
    prevMonths,
    page,
    direction,
  } = useGlobalContext();

  let colstart = [
    "",
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
  ];
  const gridView = () => {
    switch (el) {
      case "Giorni":
        return "grid grid-cols-1 gap-4 relative";

      case "Settimane":
        return "grid grid-cols-7 max-sm:grid-cols-2 relative ";

      case "Mesi":
        return "grid grid-cols-7 relative";

      default:
        break;
    }
  };

  function passData(data) {
    setEvent(data);
    setIsDetailsOpen(!isDetailsOpen);
  }
  // const [[page, direction], setPage] = useState([0,0])
  // const paginate = (newDirection) => {
  //   setPage([page + newDirection, newDirection])
  // }
  const handlers = useSwipeable({
    onSwipedRight: () => prevMonths(),
    onSwipedLeft: () => nextMonths(),
  });

  const isMobile = useMobile(639);
  console.log(direction);
  return (
    <div {...handlers} className="container overflow-hidden relative">
      <AnimatePresence custom={direction} mode="popLayout" initial={false}>
        <motion.div
          // key={`calendar-${index}`}
          // initial={{ x: "-100vw" }}
          // animate={{ x: "0" }}
          // exit={{ x: "100vw" }}
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className={gridView()}
          transition={{
            x: { type: "spring", stiffness: 120 },
            opacity: { duration: 0.2 },
          }}
        >
          {el !== "Giorni"
            ? dayName.map((dayName, i) => {
                return (
                  <div
                    key={`giorni-${i}`}
                    className={`${
                      el === "Settimane" && "max-sm:hidden "
                    } text-left mb-2 pl-2 truncate`}
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
                className={` ${
                  isMobile && el === "Settimane" ? "h-32 border" : "h-28"
                } ${
                  isSameMonth(day, dayCurrentMonths, dayCurrentWeek)
                    ? "text-slate-900"
                    : "bg-slate-100"
                } auto-rows-auto border-t pt-2 px-2 flex flex-col items-start justify-start`}
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
                  {isMobile && el === "Settimane"
                    ? format(day, "d iii")
                    : format(day, "d")}
                </div>
                <div className="flex flex-col items-start w-full gap-1 overflow-auto">
                  {meeting &&
                    meeting
                      .filter((singleMeeting) =>
                        isSameDay(parseISO(singleMeeting.time), day)
                      )
                      .map((events, i) => {
                        return (
                          <div
                            className={`${events.color} w-full text-sm shadow-lg px-2 flex items-center justify-start truncate`}
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
                className="border-t h-96 flex flex-col px-2 items-center justify-center gap-4"
              >
                <div
                  key={`days-${i}`}
                  className={`${
                    isSameMonth(day, dayCurrentMonths, dayCurrentWeek)
                      ? "text-slate-900"
                      : "text-slate-200"
                  }  flex justify-center items-center rounded-md`}
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
                            className={`${events.color} w-full text-sm shadow-lg px-2 flex items-center justify-start overflow-auto`}
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
