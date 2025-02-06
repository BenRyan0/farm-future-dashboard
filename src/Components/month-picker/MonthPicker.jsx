import React from 'react';
import MonthPicker from 'react-month-picker-simple';

const baseStyle = {
  backgroundColor: 'blue',
  border: '1px solid white',
  color: 'white',
};

const selectedStyle = {
  backgroundColor: 'white',
  color: 'black',
};

export default function MonthPickerComponent() {
  return (
    <div style={{ width: '300px' }}>
      <MonthPicker
        language="zh"
        buttonStyle={baseStyle}
        selectedButtonStyle={selectedStyle}
        handleChange={(date) => {
          console.log('Selected date:', date);
        }}
      />
    </div>
  );
}
