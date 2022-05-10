import React, { useState } from 'react';
import HowToUseTooltip from './components/HowToUseTooltip';
import TimesheetTable from './components/TimesheetTable';
import TimesheetDay from './models/TimesheetDay';

function App() {
  const [textValue, setTextValue] = useState('');
  const [daysList, setDaysList] = useState<TimesheetDay[]>([]);

  function convertText(event: React.SyntheticEvent) {
    setDaysList(TimesheetDay.parse(textValue));
    event.preventDefault();
  }

  return (
    <div className="bg-sky-900 font-sans min-h-screen selection:bg-sky-500 text-sky-50">
      <nav className="backdrop-blur bg-sky-800/70 px-10 py-4 shadow-md sticky top-0 z-30">
        <div className="flex item-center justify-between w-full">
          <a href={window.location.href}>
            <span className="font-bold self-center text-xl whitespace-nowrap">
              Quick Timesheet
            </span>
          </a>
          <div>
            <HowToUseTooltip className="mx-4 max-w-[calc(100%-2rem)] right-0 w-[400px]" />
          </div>
        </div>
      </nav>
      <form
        className="content-center flex flex-col items-center justify-center p-8 space-y-10 mx-auto"
        onSubmit={convertText}
      >
        <label className="flex flex-col flex-none font-medium text-left text-sm w-2/3">
          Text to convert
          <textarea
            className="bg-sky-700 flex-auto min-h-[16rem] focus:outline focus:outline-2 mt-2 outline-sky-200 px-2 py-1 resize-y rounded-sm shadow-md transition-all duration-75 ease-in-out"
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
      <div className="p-4">
        <TimesheetTable daysList={daysList} />
      </div>
    </div>
  );
}

export default App;
