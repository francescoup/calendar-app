import React, { useState, useId } from "react";
import { useGlobalContext } from "../Context";
import { colors } from "../Data/TimeSlot";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const { isOpen, meeting, setMeeting, saveToLocalStorage } =
    useGlobalContext();

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
          animate={{ opacity: 1, y: "100px" }}
          exit={{ opacity: 0, y: "-100px" }}
          className="fixed flex flex-col gap-4 p-4 -translate-y-1/2 lg:w-80 lg:h-auto w-screen h-screen bg-slate-100 z-10   -translate-x-1/2 opacity-1"
        >
          <h2>Aggiungi un appuntamento</h2>
          <h3>data</h3>
          <input
            type="date"
            name="time"
            value={input.time}
            onChange={onchange}
          />
          <h3>Colore</h3>
          <select name="color" value={input.color} onChange={onchange}>
            {colors.map((color, i) => {
              return (
                <option key={i} value={color.value}>
                  {color.value}
                </option>
              );
            })}
          </select>
          <h3>Descrizione</h3>
          <textarea
            type="textarea"
            name="title"
            rows={3}
            cols={3}
            value={input.title}
            onChange={onchange}
          />
          <button
            className="w-full rounded-md p-2 bg-slate-50 border border-slate-400"
            type="submit"
            onClick={submit}
          >
            Save
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
