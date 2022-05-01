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
    <div className='bg-sky-900 font-sans min-h-screen selection:bg-sky-500 text-sky-50'>
      <form
        className='content-center flex flex-col items-center justify-center p-8 space-y-2'
        onSubmit={convertText}
      >
        <label className='flex-none' htmlFor='text-to-convert'>
          Text to convert
        </label>
        <textarea
          id='text-to-convert'
          className='bg-sky-700 flex-auto min-h-[16rem] focus:outline focus:outline-2 outline-sky-200 px-2 py-1 resize-y rounded-sm shadow-md transition-all duration-75 ease-in-out w-2/3'
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        >
        </textarea>
        <br />
        <input
          className='active:bg-sky-600 bg-sky-500 cursor-pointer flex-none font-medium hover:bg-sky-400 px-8 py-3 rounded-md shadow-md w-fit'
          type='submit'
          value='Convert'
        >
        </input>
      </form>
      <div className='p-4'>
        <TimesheetTable daysList={daysList} />
      </div>
    </div>
  );
}

export default App;
