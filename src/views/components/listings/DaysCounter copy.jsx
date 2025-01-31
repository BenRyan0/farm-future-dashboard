import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import OngoingHarvest from './OngoingHarvest';

import dateFormat, { masks } from "dateformat";

const DaysCounter = ({ endDay, daysConsumed }) => {
  // endDate={dateFormat((listings.harvestEndDate), "yyyy-mm-dd")}  




  // Calculate the percentage of days consumed
  const percentage = (daysConsumed / endDay) * 100;
  const daysLeft = endDay - daysConsumed;

  // Determine the color based on the percentage
  const getPathColor = (percentage) => {
    if (percentage >= 80) {
      return 'red';
    }
    if (percentage >= 60 && percentage < 80) {
      return 'orange';
    }
    if (percentage <= 100 && percentage > 99) {
      return `rgba(30, 227, 93,.06)`;
    }
    if (percentage === 0 && percentage < 1) {
      return `rgba(30, 227, 93,.06)`;
    }
    // Use a minimum alpha value to ensure visibility
    const alpha = percentage > 0 ? percentage : 1;
    return `rgba(2, 163, 103, ${alpha})`;
 
  };

  const pathColor = getPathColor(percentage);

  return (
    <div className="flex flex-col gap-2">
 
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: '#fff',
        })}
      >

        <div className='flex gap-[2px] text-[12px] flex-col text-center transition-all duration-700'>
          {/* <span style={{ color: pathColor }}>{daysConsumed}/{endDay}</span> */}
          <span style={{ color: pathColor }}>
            {daysLeft > 0 ? `${daysLeft} ${daysLeft === 1 ? 'Day' : 'Days'}` : '---'}
          </span>
        </div>
      </CircularProgressbarWithChildren>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: '#fff',
        })}
      >

        <div className='flex gap-[2px] text-[12px] flex-col text-center transition-all duration-700'>
          {/* <span style={{ color: pathColor }}>{daysConsumed}/{endDay}</span> */}
          <span style={{ color: pathColor }}>
            {daysLeft > 0 ? `${daysLeft} ${daysLeft === 1 ? 'Day' : 'Days'}` : '---'}
          </span>
        </div>
      </CircularProgressbarWithChildren>
      
      </div>
  );
};

export default DaysCounter;
