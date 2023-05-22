import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext } from "../Context";
import EditEvent from "./EditEvent";

const ModalLayout = () => {
  const {
    removeEvents,
    isEdit,
    edit,
    setIsEdit,
    meeting,
    event,
    isDetailsOpen,
    setIsDetailsOpen,
  } = useGlobalContext();
  console.log(isDetailsOpen);
  return (
    <AnimatePresence>
      {isDetailsOpen && (
        <motion.div
          key="modalEvents"
          initial={{ opacity: 0, y: "-100px" }}
          animate={{ opacity: 1, y: "200px" }}
          exit={{ opacity: 0, y: "-100px" }}
          className="fixed flex flex-col gap-4 p-4 z-10 lg:w-80 lg:h-auto w-screen h-screen bg-slate-100"
        >
          {isEdit ? (
            <EditEvent input={event} update={edit} close={setIsEdit} />
          ) : (
            <div key={event.time}>
              <h2>{event.time}</h2>
              <h2>{event.color}</h2>
              <h2>{event.title}</h2>
              <button onClick={() => removeEvents(event)}>cancella</button>
              <button onClick={edit}>edit</button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalLayout;
