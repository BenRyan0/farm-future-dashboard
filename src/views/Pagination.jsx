import React from 'react'
import {BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons/bs'

const Pagination = ({pageNumber, setPageNumber, totalItem, parPage, showItem}) => {
  let totalPage = Math.ceil(totalItem / parPage)
  let startPage = pageNumber

  let dif = totalPage - pageNumber;

  if(dif<=showItem){
    startPage = totalPage - showItem
  }

  let endPage = startPage<0 ? showItem : showItem + startPage

  if(startPage<=0){
    startPage = 1
  }

  const createBtn = ()=>{
    const btns = []
    for(let i = startPage; i<endPage ; i++){
      btns.push(
        <li onClick={()=>setPageNumber(i)} className={`
          ${pageNumber === i ? 'bg-accent/40 shadow-sm shadow-indigo-500/50 text-white' : 'bg-slate-700 hover:bg-accent/50 shadow-sm hover:shadow-indigo-500/50 hover:text-[#d0d2d6]'} w-[33px] h-[33px] rounded-md flex items-center justify-center cursor-pointer text-white`
          
        }>
          {i}
        </li>
      )
    }
    return btns

  }

  return(
    <ul className='flex gap-3'>
      {
        pageNumber>1 && <li onClick={()=>setPageNumber(pageNumber - 1)} className='w-[33px] h-[33px] rounded-md flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer'>
          <BsChevronDoubleLeft/>
        </li>
      }
      {
        createBtn()
      }
        {
        pageNumber < totalPage && <li onClick={()=>setPageNumber(pageNumber + 1)} className='w-[33px] h-[33px] rounded-md flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer'>
          <BsChevronDoubleRight/>
        </li>
      }
    </ul>
  )
}

export default Pagination