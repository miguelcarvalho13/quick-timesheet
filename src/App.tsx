import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TimesheetTable from './components/TimesheetTable/TimesheetTable';
import TimesheetDay from './models/TimesheetDay';

function App() {
  const [textValue, setTextValue] = useState('');
  const [daysList, setDaysList] = useState<TimesheetDay[]>([]);

  function convertText(event: React.SyntheticEvent) {
    setDaysList(TimesheetDay.parse(textValue));
    event.preventDefault();
  }

  return (
    <div className="bg-slate-900 font-sans min-h-screen selection:bg-sky-500 text-white">
      <Navbar />
      <form
        className="content-center flex flex-col items-center justify-center px-4 py-8 space-y-10 max-w-screen-md mx-auto"
        onSubmit={convertText}
      >
        <label className="flex flex-col flex-none font-medium text-left text-sm w-full">
          Text to convert
          <textarea
            className="bg-slate-700 flex-auto min-h-[16rem] focus:outline focus:outline-2 mt-2 outline-sky-500 px-2 py-1 resize-y rounded-sm shadow-md transition-all duration-75 ease-in-out"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          ></textarea>
        </label>
        <input
          className="active:bg-sky-600 bg-sky-500 cursor-pointer flex-none font-medium hover:bg-sky-400 px-8 py-3 rounded-md shadow-md w-fit"
          type="submit"
          value="Convert"
        />
      </form>
      <div className="p-4 max-w-fit mx-auto">
        <TimesheetTable daysList={daysList} />
      </div>
    </div>
  );
}

export default App;
