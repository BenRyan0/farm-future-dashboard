import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrevPageButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page in the browser's history
  };

  return (
    <button className='hover:underline text-slate-200' onClick={handleBack} style={{ padding: '10px 20px', fontSize: '12px', cursor: 'pointer' }}>
      Go Back To Previous Page
    </button>
  );
};

export default PrevPageButton;
