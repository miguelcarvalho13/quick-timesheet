import React, { useState } from 'react';
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
    <div className='bg-sky-900 font-sans min-h-screen text-sky-100'>
      <form
        className='content-center flex flex-col items-center justify-center p-8 space-y-2'
        onSubmit={convertText}
      >
        <label className='flex-none' htmlFor='text-to-convert'>
          Text to convert
        </label>
        <textarea
          id='text-to-convert'
          className='bg-sky-700 flex-1 p-1 rounded-sm w-2/3'
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        >
        </textarea>
        <br />
        <input
          className='bg-sky-500 flex-none px-8 py-3 rounded-md w-fit'
          type='submit'
          value='Convert'
        >
        </input>
      </form>
      <TimesheetTable daysList={daysList} />
    </div>
  );
}

export default App;
