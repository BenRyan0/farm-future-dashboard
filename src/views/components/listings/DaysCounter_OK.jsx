import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DaysCounter = ({ startDate, endDate, createdAt }) => {
  // Convert startDate and createdAt to Date objects
  const start = new Date(startDate);
  const created = new Date(createdAt);
  const current = new Date("2024-10-05");

  // Calculate the number of days until the start date
  const daysUntilStart = Math.ceil((start - current) / (1000 * 60 * 60 * 24));

  // Calculate total days from createdAt to startDate
  const totalDays = Math.ceil((start - created) / (1000 * 60 * 60 * 24));

  // Calculate the percentage of days until the start date compared to total days
  const percentage = (daysUntilStart / totalDays) * 100;
  const flippedPercentage = percentage >= 100 ? 0 : 100 - percentage;

  const [currentPercentage, setCurrentPercentage] = useState(flippedPercentage);
  const [showSecond, setShowSecond] = useState(false);

  console.log("ASdasd")
  console.log(flippedPercentage)
  useEffect(() => {
    if (flippedPercentage >= 100) {
      setShowSecond(true);
    }else{
      setShowSecond(false);
    }
  }, [flippedPercentage]);

  // Determine the color based on the flipped percentage
  const getPathColor = (percentage) => {
    if (percentage >= 80) {
      return 'red';
    } else if (percentage >= 60) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const pathColor = getPathColor(flippedPercentage);

  // Second progress bar logic
  const start_ = new Date(endDate);
  const daysUntilStart_ = Math.ceil((start_ - current) / (1000 * 60 * 60 * 24));
  const totalDays_ = Math.ceil((startDate - endDate) / (1000 * 60 * 60 * 24));
  const percentage_ = (daysUntilStart_ / totalDays_) * 100;
  const flippedPercentage_ = percentage_ >= 100 ? 0 : 100 - percentage_;
  const pathColor_ = getPathColor(flippedPercentage_);

  // const getPathColor_ = (percentage) => {
  //   if (percentage_ >= 80) {
  //     return 'red';
  //   } else if (percentage_ >= 60) {
  //     return 'orange';
  //   } else {
  //     return 'green';
  //   }
  // };

  return (
    <div className="flex flex-col gap-1">
      <CircularProgressbarWithChildren
        className='bg-white rounded-full p-1'
        value={flippedPercentage}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: '#fff',
          background: pathColor,
        })}
      >
        <div className='flex gap-[2px] text-[12px] flex-col text-center transition-all duration-700'>
          <span style={{ color: pathColor }}>
            {daysUntilStart > 0 ? `${daysUntilStart} ${daysUntilStart === 1 ? 'Day' : 'Days'}` : '---'}
          </span>
        </div>
      </CircularProgressbarWithChildren>
      {/* <div className="flex flex-col w-[100px] bg-green-600">
        <div>{daysUntilStart}</div>
        <div>{totalDays}</div>
        <div>{percentage.toFixed(2)}%</div>  
        <div>{flippedPercentage.toFixed(2)}%</div>  
      </div> */}

      {showSecond && 
        <CircularProgressbarWithChildren
          className='bg-white rounded-full p-1'
          value={flippedPercentage_}
          styles={buildStyles({
            pathColor: pathColor_,
            trailColor: '#fff',
            background: pathColor_,
          })}
        >
          <div className='flex gap-[2px] text-[12px] flex-col text-center transition-all duration-700'>
            <span style={{ color: pathColor_ }}>
              {daysUntilStart_ > 0 ? `${daysUntilStart_} ${daysUntilStart_ === 1 ? 'Day' : 'Days'}` : '---'}
            </span>
          </div>
        </CircularProgressbarWithChildren>
      }
    </div>
  );
};

export default DaysCounter;
