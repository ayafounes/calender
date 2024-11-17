import React, { useState } from "react";
import "./App.css";

const App = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const generateCalendar = (month, year) => {
    const daysOfMonth = [
      31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    ];

    const calendarDays = [];
    const firstDay = new Date(year, month, 1).getDay();

    // Calculer les jours de la semaine
    for (let i = 0; i < daysOfMonth[month] + firstDay; i++) {
      const dayNumber = i >= firstDay ? i - firstDay + 1 : null;
      
      const isSelected = dayNumber && dayNumber >= selectedRange.start && dayNumber <= selectedRange.end;

      calendarDays.push(
        <div
          key={i}
          className={`calendar-day-hover ${isSelected ? "selected" : ""}`}
          onClick={() => handleRangeSelect(dayNumber)}
        >
          {dayNumber}
        </div>
      );
    }

    return calendarDays;
  };

  const handleRangeSelect = (day) => {
    if (!day) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Démarrer une nouvelle plage
      setSelectedRange({ start: day, end: null });
    } else {
      // Terminer la plage
      setSelectedRange({ ...selectedRange, end: day });
    }
  };

  const formatDate = (day, month, year) => {
    return `${day < 10 ? '0' : ''}${day}/${month < 9 ? '0' : ''}${month + 1}/${year}`;
  };

  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [inputValue, setInputValue] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [confirmSelected, setConfirmSelected] = useState(false); // Ajouter une variable pour gérer la confirmation

  const handleConfirmSelection = () => {
    if (selectedRange.start && selectedRange.end) {
      const startDate = formatDate(selectedRange.start, currMonth, currYear);
      const endDate = formatDate(selectedRange.end, currMonth, currYear);
      setInputValue(`${startDate} au ${endDate}`);
    }
    setShowCalendar(false); // Masquer le calendrier après la sélection
    setConfirmSelected(true); // Marquer la sélection comme confirmée
  };

  return (
    <div className="calendar">
      {/* Input pour la date avec le calendrier */}
      <div className="date-range-input">
        <input
          type="text"
          value={inputValue}
          placeholder="Date départ"
          readOnly
          onClick={() => setShowCalendar(true)} // Afficher le calendrier lorsque l'input est cliqué
        />
        <button onClick={handleConfirmSelection}>Confirm Selection</button>
      </div>

      {/* Afficher le calendrier uniquement si showCalendar est vrai et confirmSelected est faux */}
      {showCalendar && !confirmSelected && (
        <>
          <div className="calendar-header">
            <button onClick={() => setCurrYear((prev) => prev - 1)}>&#8249;</button>
            <h2>{currYear}</h2>
            <button onClick={() => setCurrYear((prev) => prev + 1)}>&#8250;</button>
          </div>
          <div className="month-picker">
            <button onClick={() => setCurrMonth((prev) => (prev - 1 + 12) % 12)}>&#8249;</button>
            <h3>{monthNames[currMonth]}</h3>
            <button onClick={() => setCurrMonth((prev) => (prev + 1) % 12)}>&#8250;</button>
          </div>
        </>
      )}

      {/* Affichage du calendrier des jours */}
      {showCalendar && !confirmSelected && (
        <div className="calendar-days">
          {generateCalendar(currMonth, currYear)}
        </div>
      )}
    </div>
  );
};

export default App;
