import React, { useState, useId } from "react";
import { useGlobalContext } from "../Context";
import { colors } from "../Data/TimeSlot";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { useMobile } from "../CostumHooks/useMobile";

const Modal = () => {
  const { isOpen, meeting, setMeeting, saveToLocalStorage, openModal } =
    useGlobalContext();
  const isMobile = useMobile(639);
  const [input, setInput] = useState({
    time: "",
    color: "",
    title: "",
  });

  function onchange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const submit = () => {
    const newEvents = [
      ...meeting,
      { id: new Date(Date.now()).getTime().toString(), ...input },
    ];
    setMeeting(newEvents);
    saveToLocalStorage(newEvents);
    setInput({
      time: "",
      color: "",
      title: "",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: "-100px" }}
          animate={{ opacity: 1, y: isMobile ? "0" : "100px" }}
          exit={{ opacity: 0, y: "-100px" }}
          className="fixed flex flex-col gap-4 -translate-y-1/2 lg:w-80 md:w-80 md:h-auto lg:h-auto w-screen h-screen bg-white shadow-2xl z-30 border  -translate-x-1/2 opacity-1"
        >
          <div className="flex items-center justify-between p-4 bg-slate-500">
            <h2>Nuovo evento</h2>
            <button onClick={openModal}>
              <GrClose />
            </button>
          </div>

          <h3 className="mx-4">data</h3>
          <input
            className="h-8 px-4 mx-4 bg-white border-b-2"
            type="date"
            name="time"
            value={input.time}
            onChange={onchange}
          />
          <h3 className="mx-4">Colore</h3>
          <select
            className="h-8 px-4 mx-4 bg-white border-b-2"
            name="color"
            value={input.color}
            onChange={onchange}
          >
            {colors.map((color, i) => {
              return (
                <option key={i} value={color.value}>
                  {color.value}
                </option>
              );
            })}
          </select>
          <h3 className="mx-4">Descrizione</h3>
          <input
            className="h-8 px-4 mx-4 bg-white border-b-2"
            type="text"
            name="title"
            value={input.title}
            onChange={onchange}
          />
          <div className="m-4">
            <button
              className="w-full p-2 bg-slate-50 border box-border border-slate-400"
              type="submit"
              onClick={submit}
            >
              Save
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
