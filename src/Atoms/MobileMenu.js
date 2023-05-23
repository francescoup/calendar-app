import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import Button from "./Button";
import { calendarswitch } from "../Data/TimeSlot";
import { useGlobalContext } from "../Context";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ classname }) => {
  const { switchView, openMenuMobile, isMenuOpen } = useGlobalContext();
  return (
    <div className={classname}>
      <button onClick={openMenuMobile}>
        <CiMenuBurger />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-100px" }}
            className="text-slate-600 flex gap-2 absolute border flex-col top-8 z-10 p-4 bg-slate-50 shadow-xl"
          >
            {calendarswitch.map((menu, i) => {
              return (
                <Button
                  key={`menu-${i}`}
                  text={menu.title}
                  icon={menu.icon}
                  onclick={switchView}
                  className="flex flex-row text-lg hover:bg-slate-200 py-2 px-3 items-center gap-2"
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
