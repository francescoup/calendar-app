import React from "react";
import Button from "../Atoms/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useGlobalContext } from "../Context";
import { calendarswitch } from "../Data/TimeSlot";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "../Atoms/MobileMenu";

const Menu = () => {
  const {
    nextMonths,
    prevMonths,

    dayFormat,

    switchView,
  } = useGlobalContext();

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
      <AnimatePresence mode="wait">
        <motion.div
          key={dayFormat}
          initial={{ opacity: 0, y: "-10px" }}
          animate={{ opacity: 1, y: "0" }}
          exit={{ opacity: 0, y: "10px" }}
          className="mx-8 relative"
        >
          <h2 className="text-xl text-red-500">{dayFormat}</h2>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
};

export default Menu;
