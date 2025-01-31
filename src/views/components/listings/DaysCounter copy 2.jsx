import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import dateFormat from 'dateformat';

const DaysCounter = ({  startDate,  endDate,  createdAt,currentDate }) => {
  // Convert startDate to Date object
  const start = new Date(startDate);
  const current = new Date();

  // Calculate the number of days until the start date
  const daysUntilStart = Math.ceil((start - current) / (1000 * 60 * 60 * 24)) - 1;

  // Calculate the percentage of days left
  const totalDays = Math.ceil((start - current) / (1000 * 60 * 60 * 24)) -1;
  // const percentage = (daysUntilStart / totalDays) * 100;

  // console.log(percentage)
  // // Determine the color based on the percentage
  // const getPathColor = (percentage) => {
  //   if (percentage >= 80) {
  //     return 'red';
  //   }
  //   if (percentage >= 60 && percentage < 80) {
  //     return 'orange';
  //   }
  //   if (percentage <= 100 && percentage > 99) {
  //     return `rgba(30, 227, 93, .06)`;
  //   }
  //   if (percentage === 0 && percentage < 1) {
  //     return `rgba(30, 227, 93, .06)`;
  //   }
  //   // Use a minimum alpha value to ensure visibility
  //   const alpha = percentage > 0 ? percentage : 1;
  //   return `rgba(2, 163, 103, ${alpha})`;
  // };

  const percentage = (totalDays - daysUntilStart) / totalDays * 100;

  // Determine the color based on the percentage
  const getPathColor = (percentage) => {
    if (percentage >= 80) {
      return 'red';
    } else if (percentage >= 60 && percentage < 80) {
      return 'orange';
    } else if (percentage <= 50){
       return 'green'
    }else {
      return 'green';
    }
  };


  const pathColor = getPathColor(percentage);

  return (
    <div className="flex flex-col gap-2 ">
      <CircularProgressbarWithChildren
        className='bg-white rounded-full'
        value={percentage}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: '#fff',
          background: pathColor
        })}
      >
        <div className='flex gap-[2px] text-[12px] flex-col text-center transition-all duration-700' >
          <span style={{ color: pathColor }}>
            {daysUntilStart > 0 ? `${daysUntilStart} ${daysUntilStart === 1 ? 'Day' : 'Days'}` : '---'}
          </span>
        </div>
      </CircularProgressbarWithChildren>
     <div className="flex flex-col">
      <div className="">{daysUntilStart}</div>
      <div className="">{totalDays}</div>
      <div className="">{percentage}</div>
   
     
     </div>
    </div>
  );
};

export default DaysCounter;
