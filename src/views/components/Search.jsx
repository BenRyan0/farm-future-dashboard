import React, {useState} from 'react'
const Search = ({setParpage, setSearchValue, searchValue}) => {

  return (
    <div className="flex justify-between  items-center w-full ">
        <select onChange={(e)=>setParpage(parseInt(e.target.value))} className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="25">25</option>
        </select>
        <input onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} className='bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
    </div>
  )
}

export default Search