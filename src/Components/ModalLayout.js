import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { useGlobalContext } from "../Context";
import { useMobile } from "../CostumHooks/useMobile";
import EditEvent from "./EditEvent";

const ModalLayout = () => {
  const isMobile = useMobile(639);
  const {
    removeEvents,
    isEdit,
    edit,
    setIsEdit,
    event,
    isDetailsOpen,
    setIsDetailsOpen,
  } = useGlobalContext();

  return (
    <AnimatePresence>
      {isDetailsOpen && (
        <motion.div
          key="modalEvents"
          initial={{ opacity: 0, y: "-100px" }}
          animate={{ opacity: 1, y: isMobile ? "0" : "100px" }}
          exit={{ opacity: 0, y: "-100px" }}
          className="fixed flex flex-col gap-4 z-30 lg:w-80 lg:h-auto w-screen h-screen bg-white border shadow-xl"
        >
          {isEdit ? (
            <EditEvent input={event} update={edit} close={setIsEdit} />
          ) : (
            <div key={event.time}>
              <div className="flex items-center justify-between p-4">
                <h2>Evento</h2>
                <button onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                  <GrClose />
                </button>
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-sky-800">{event.title}</h2>
                <h2>{event.time}</h2>
                <h2>{event.color}</h2>
                <div className="flex justify-between">
                  <button
                    className="flex w-full items-center justify-center"
                    onClick={() => removeEvents(event)}
                  >
                    cancella
                  </button>
                  <button
                    className="flex border border-red-800 py-2 w-full items-center justify-center"
                    onClick={edit}
                  >
                    Modifica
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalLayout;
