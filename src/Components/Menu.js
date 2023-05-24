import React from "react";
import Button from "../Atoms/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useGlobalContext } from "../Context";
import { calendarswitch } from "../Data/TimeSlot";
import { motion, AnimatePresence, delay } from "framer-motion";
import MobileMenu from "../Atoms/MobileMenu";
import { useMobile } from "../CostumHooks/useMobile";

const Menu = () => {
  const {
    nextMonths,
    prevMonths,
    index,
    dayFormat,

    switchView,
    paginate,
  } = useGlobalContext();
  const isMobile = useMobile(639);
  return (
    <nav className="container flex  items-center pt-4 pb-4 ">
      <div className="text-slate-600 flex gap-4">
        {calendarswitch.map((menu, i) => {
          return (
            <Button
              key={`menu-${i}`}
              text={menu.title}
              icon={menu.icon}
              onclick={switchView}
              className="flex flex-row text-lg hover:bg-slate-200 py-2 px-3 items-center gap-2 max-sm:hidden"
            />
          );
        })}
      </div>
      <MobileMenu classname="lg:hidden md:hidden text-lg flex items-center mx-2 relative" />

      <button className="max-sm:hidden" onClick={prevMonths}>
        <IoIosArrowBack />
      </button>
      <button className="max-sm:hidden" onClick={nextMonths}>
        <IoIosArrowForward />
      </button>
      <AnimatePresence mode={isMobile ? "wait" : "popLayout"} initial="false">
        <motion.div
          key={index}
          initial={{
            zIndex: 0,
            opacity: 0,
            y: "10px",
          }}
          animate={{
            zIndex: 1,
            opacity: 1,
            y: "0",
          }}
          exit={{ zIndex: 0, opacity: 0, y: "-10px" }}
          transition={{
            y: { type: "spring" },
          }}
          className="mx-8 h-8  w-auto overflow-hidden"
        >
          <h2 className="text-xl  text-red-500">{dayFormat}</h2>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
};

export default Menu;
