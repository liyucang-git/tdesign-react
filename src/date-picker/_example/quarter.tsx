import React from 'react';
import { DatePicker, DateRangePicker, Space, type DatePickerProps, type DateRangePickerProps } from 'tdesign-react';

export default function YearDatePicker() {
  const handleChange: DatePickerProps['onChange'] = (value) => {
    console.log(value);
  };

  const handleRangeChange: DateRangePickerProps['onChange'] = (value) => {
    console.log(value);
  };

  return (
    <Space direction="vertical">
      <DatePicker mode="quarter" clearable allowInput onChange={handleChange} />
      <DateRangePicker mode="quarter" clearable allowInput onChange={handleRangeChange} />
    </Space>
  );
}
