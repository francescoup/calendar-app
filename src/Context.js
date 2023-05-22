import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import {
  add,
  format,
  parse,
  startOfToday,
  startOfWeek,
  eachDayOfInterval,
  endOfWeek,
  endOfMonth,
} from "date-fns";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  let today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [currentWeek, setCurrentWeek] = useState(format(today, "dd-MMM-yyyy"));
  const [currentDay, setCurrentDay] = useState(format(today, "dd-MMM-yyyy"));
  const [dayFormat, setDayFormat] = useState(currentMonth);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [index, setIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [event, setEvent] = useState(null);

  let dayCurrentMonths = parse(currentMonth, "MMM-yyyy", new Date());
  let dayCurrentWeek = parse(currentWeek, "dd-MMM-yyyy", new Date());
  let dayCurrent = parse(currentDay, "dd-MMM-yyyy", new Date());

  let daysInterval = dayCurrent;
  let newDays = eachDayOfInterval({
    start: startOfWeek(dayCurrentMonths, { weekStartsOn: 1 }),
    end: add(endOfWeek(endOfMonth(dayCurrentMonths), { weekStartsOn: 1 }), {
      weeks: 1,
    }),
  });

  let weekInterval = eachDayOfInterval({
    start: startOfWeek(dayCurrentWeek, { weekStartsOn: 1 }),

    end: endOfWeek(dayCurrentWeek, { weekStartsOn: 1 }),
  });
  const [days, setDays] = useState(newDays);
  const [el, setEl] = useState("Mesi");

  const nextMonths = useCallback(() => {
    if (el === "Settimane") {
      let nextWeek = add(dayCurrentWeek, { weeks: 1 });

      setCurrentWeek(format(nextWeek, "dd-MMM-yyyy"));
      setCurrentMonth(format(nextWeek, "MMM-yyyy"));
      setCurrentDay(format(nextWeek, "dd-MMM-yyyy"));
    } else if (el === "Mesi") {
      let dayNextMonths = add(dayCurrentMonths, { months: 1 });
      setCurrentMonth(format(dayNextMonths, "MMM-yyyy"));
      setCurrentWeek(format(dayNextMonths, "dd-MMM-yyyy"));
      setCurrentDay(format(dayNextMonths, "dd-MMM-yyyy"));
    } else if (el === "Giorni") {
      let dayNext = add(dayCurrent, { days: 1 });
      setCurrentDay(format(dayNext, "dd-MMM-yyyy"));
      setCurrentMonth(format(dayNext, "MMM-yyyy"));
      setCurrentWeek(format(dayNext, "dd-MMM-yyyy"));
    }
    setIndex((prev) => prev + 1);
  }, [el, currentMonth, currentWeek, currentDay]);

  const prevMonths = useCallback(() => {
    if (el === "Settimane") {
      let nextWeek = add(dayCurrentWeek, { weeks: -1 });

      setCurrentWeek(format(nextWeek, "dd-MMM-yyyy"));
      setCurrentMonth(format(nextWeek, "MMM-yyyy"));
      setCurrentDay(format(nextWeek, "dd-MMM-yyyy"));
    } else if (el === "Mesi") {
      let dayNextMonths = add(dayCurrentMonths, { months: -1 });
      setCurrentMonth(format(dayNextMonths, "MMM-yyyy"));
      setCurrentWeek(format(dayNextMonths, "dd-MMM-yyyy"));
      setCurrentDay(format(dayNextMonths, "dd-MMM-yyyy"));
    } else if (el === "Giorni") {
      let dayNext = add(dayCurrent, { days: -1 });
      setCurrentDay(format(dayNext, "dd-MMM-yyyy"));
      setCurrentWeek(format(dayNext, "dd-MMM-yyyy"));
      setCurrentMonth(format(dayNext, "MMM-yyyy"));
    }
    setIndex((prev) => prev - 1);
  }, [el, currentMonth, currentWeek, currentDay]);

  useEffect(() => {
    if (el === "Settimane") {
      setDays(weekInterval);
    } else if (el === "Mesi") {
      setDays(newDays);
    } else if (el === "Giorni") {
      setDays([daysInterval]);
    }
  }, [el, nextMonths, prevMonths]);
  useEffect(() => {
    if (el === "Settimane") {
      setDayFormat(format(dayCurrentWeek, "dd MMM yyyy"));
    } else if (el === "Mesi") {
      setDayFormat(format(dayCurrentMonths, "MMM yyyy"));
    } else if (el === "Giorni") {
      setDayFormat(format(dayCurrent, "dd MMM yyyy"));
    }
  }, [el, nextMonths, prevMonths]);

  function switchView(key) {
    switch (key) {
      case "Day":
        return setEl("Giorni");

      case "Week":
        return setEl("Settimane");

      case "Month":
        return setEl("Mesi");

      default:
        break;
    }
  }
  function openModal() {
    setIsOpen(!isOpen);
  }

  function edit() {
    setIsEdit(!isEdit);
  }

  //save to local storage
  useEffect(() => {
    const eventsContainer = JSON.parse(localStorage.getItem("appointment"));

    if (eventsContainer) {
      setMeeting(eventsContainer);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("appointment", JSON.stringify(items));
  };

  const removeEvents = (items) => {
    const newEventsList = meeting.filter(
      (singleMeeting) => singleMeeting.id !== items.id
    );
    setMeeting(newEventsList);
    saveToLocalStorage(newEventsList);
    setIsDetailsOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        nextMonths,
        prevMonths,
        dayCurrentMonths,
        dayCurrentWeek,
        newDays,
        days,
        weekInterval,
        setDays,

        el,
        dayFormat,

        openModal,
        isOpen,
        meeting,
        setMeeting,

        saveToLocalStorage,
        removeEvents,
        isDetailsOpen,
        setIsDetailsOpen,
        index,
        isEdit,
        setIsEdit,
        edit,
        event,
        setEvent,
        switchView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
