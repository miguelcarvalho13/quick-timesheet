import React, { useState } from 'react';
import dayjs from 'dayjs';
import './App.css';
import TimesheetTable from './components/TimesheetTable';
import TimesheetDay from './models/TimesheetDay';

function App() {
  const [textValue, setTextValue] = useState('')
  const [daysList, setDaysList] = useState<TimesheetDay[]>([])

  function convertText(event: React.SyntheticEvent) {
    setDaysList(TimesheetDay.parse(textValue));
    event.preventDefault();
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
