import React, { useState } from 'react';
import dayjs from 'dayjs';
import { TimesheetDay } from './types';
import './App.css';
import TimesheetTable from './components/TimesheetTable';

function parseText(text: string) {
  return text
    .trim()
    .split('\n\n')
    .map(s => s.split('\n'))
    .map(createTimesheetDay)
}

function createTimesheetDay([dateString, ...intervalsList]: string[]): TimesheetDay {
  const date = dayjs(dateString, 'DD/MM/YYYY').toDate();
  const timeIntervals = intervalsList
    .map((s) => s.split('-'))
    .map(([s0, s1]) => {
      const start = dayjs(`${dateString} ${s0}`, 'DD/MM/YYYY HH:mm')
      const end = dayjs(`${dateString} ${s1}`, 'DD/MM/YYYY HH:mm')
      const duration = end.diff(start, 'minute')

      return { start: start.toDate(), end: end.toDate(), duration }
    })

  return { date, timeIntervals }
}

function App() {
  const [textValue, setTextValue] = useState('')
  const [daysList, setDaysList] = useState<TimesheetDay[]>([])

  function convertText(event: React.SyntheticEvent) {
    setDaysList(parseText(textValue));
    console.log(daysList)
    event.preventDefault()
  }

  return (
    <div className='main'>
      <form onSubmit={convertText}>
        <label>
          <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)}></textarea>
        </label>
        <br />
        <input type='submit' value='Convert'></input>
      </form>
      <TimesheetTable daysList={daysList} />
    </div>
  );
}

export default App;
