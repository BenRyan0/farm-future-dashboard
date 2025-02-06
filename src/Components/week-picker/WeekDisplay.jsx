import React, { useState, useEffect } from 'react';

const WeekDisplay = ({ week }) => {
    const [weekNumber, setWeekNumber] = useState(null);
    const [month, setMonth] = useState('');
  
    // Method to calculate the week number in the month
    const calculateWeekNumber = (firstDay) => {
      const startOfMonth = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1);
      const diffDays = Math.floor((firstDay - startOfMonth) / (1000 * 60 * 60 * 24));
      return Math.floor(diffDays / 7) + 1;
    };
  
    // Method to get the full month name
    const getMonthName = (firstDay) => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[firstDay.getMonth()];
    };
  
    useEffect(() => {
      if (week && week.firstDay) {
        const firstDayDate = new Date(week.firstDay); // Convert string to Date
        const weekNum = calculateWeekNumber(firstDayDate);
        setWeekNumber(weekNum);
        setMonth(getMonthName(firstDayDate));
      }
    }, [week]);
  
    return (
      <div className='text-slate-200'>
        <h2 className="pt-3">Date Selected: </h2>
        <span>{week.firstDay && weekNumber !== null ? `${month} - Week ${weekNumber}` : 'Invalid Week Data'}</span>
      </div>
    );
  };
  

export default WeekDisplay;
