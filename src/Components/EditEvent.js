import React, { useState } from "react";
import { colors } from "../Data/TimeSlot";
import { useGlobalContext } from "../Context";

const EditEvent = ({ input, update, close }) => {
  const [isUpdate, setIsUpdate] = useState({
    time: input.time,
    color: input.color,
    title: input.title,
  });
  const {
    meeting,
    setMeeting,

    saveToLocalStorage,
  } = useGlobalContext();
  function updateEvents(e) {
    const updateEvent = meeting.map((li) => {
      return li.id === input.id
        ? { ...li, [e.target.name]: e.target.value }
        : li;
    });
    setIsUpdate(updateEvent);
  }
  console.log(isUpdate);
  function submit(e) {
    e.preventDefault();
    if (isUpdate.time === input.time) {
      close(!update);
    } else {
      setMeeting(isUpdate);
      saveToLocalStorage(isUpdate);
      close(!update);
    }
  }
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-between p-4 bg-slate-500">
        <h2>Modifica evento</h2>
      </div>

      <h3 className="mx-4">data</h3>
      <input
        className="h-8 px-4 mx-4 bg-white border-b-2"
        type="date"
        name="time"
        defaultValue={isUpdate.time}
        onChange={updateEvents}
      />
      <h3 className="mx-4">Colore</h3>
      <select
        className="h-8 px-4 mx-4 bg-white border-b-2"
        name="color"
        defaultValue={isUpdate.color}
        onChange={updateEvents}
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
        defaultValue={isUpdate.title}
        onChange={updateEvents}
      />
      <button
        onClick={submit}
        className="p-2 m-4 bg-slate-50 border border-slate-400"
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

export default EditEvent;
