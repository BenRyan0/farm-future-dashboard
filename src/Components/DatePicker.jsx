import { DateRangePicker } from 'react-date-range';
import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import './custom-date-range-picker.css'

const DatePicker = () => {
  const [openDate, setOpenDate] = useState(false)
  const [date,setDate] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: '#85D1A5'
    
    }
  )


  const handleChange = (ranges) => {
    setDate(ranges.selection)
  }


  const handleClick = () => { setOpenDate((prev) => !prev)}
  return (
    <div className='relative flex justify-center items-start py-1 w-full h-full transition-all duration-300 '>
      <div className="w-full flex justify-between">
       <span onClick={handleClick} className='px-3 py-1 rounded-sm bg-accent/40 font-semibold'>
        Select Date Range
       </span>
    
       <span className='font-semibold bg-accent/40 py-1 px-2 rounded-sm'>
       {
        `${format(date.startDate, "MMM dd,yyyy")} - ${format(date.endDate, "MMM dd,yyyy")}`
       }
       </span>
      </div>
 
    {  openDate && <DateRangePicker className='custom-date-range-picker w-full absolute top-[40px] z-[999999] '
        ranges={[date]}
        onChange={handleChange}
        rangeColors={["#5569ff"]}
      />}
    </div>
  )
}

export default DatePicker