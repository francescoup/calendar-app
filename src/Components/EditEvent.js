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
    isDetailsOpen,
    setIsDetailsOpen,
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
    <div>
      <h2>Modifica evento</h2>
      <h3>data</h3>
      <input
        type="date"
        name="time"
        defaultValue={isUpdate.time}
        onChange={updateEvents}
      />
      <h3>Colore</h3>
      <select
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
      <h3>Descrizione</h3>
      <textarea
        type="textarea"
        name="title"
        rows={3}
        cols={3}
        defaultValue={isUpdate.title}
        onChange={updateEvents}
      />
      <button
        onClick={submit}
        className="w-full rounded-md p-2 bg-slate-50 border border-slate-400"
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

export default EditEvent;
