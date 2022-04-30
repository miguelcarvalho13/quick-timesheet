import {
  formatDay,
  formatDuration,
  formatExtraHours,
  formatHourOfDay,
  formatTotalHours
} from '../formatters/DateTime';
import TimesheetDay from '../models/TimesheetDay';

interface TimesheetTableProps {
  daysList: TimesheetDay[]
}

function TimesheetTable(props: TimesheetTableProps) {
  if (!props.daysList.length) {
    return null;
  }

  const maxNumberOfEntries = Array.from({ length: Math.max(...props.daysList.map(d => d.intervalsAsEntries.length)) })

  return (
    <table className='table-auto border-collapse border border-sky-200 w-full p-8'>
      <caption>Timesheet</caption>
      <thead>
        <tr>
          <th className='bg-sky-800 border-b border-sky-200 sticky text-left -top-1 px-6 py-3 whitespace-nowrap'>Day</th>
          {maxNumberOfEntries.map((_, i) => <th className='bg-sky-800 border-b border-sky-200 sticky text-left -top-1 px-6 py-3 whitespace-nowrap' key={i}>Entry {i+1}</th>)}
          <th className='bg-sky-800 border-b border-sky-200 sticky text-left -top-1 px-6 py-3 whitespace-nowrap'>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.daysList.map((timesheetDay) => {
          return (
            <tr key={formatDay(timesheetDay.date)}>
              <td className='border-b border-sky-200 px-6 py-3 whitespace-nowrap'>{formatDay(timesheetDay.date)}</td>
              {maxNumberOfEntries.map((_, i) => {
                const entry = timesheetDay.intervalsAsEntries[i];

                return (
                  <td className='border-b border-sky-200 px-6 py-3 whitespace-nowrap' key={i}>
                    {entry ? formatHourOfDay(entry) : '-'}
                  </td>
                );
              })}
              <td className='border-b border-sky-200 px-6 py-3 whitespace-nowrap'>
                {formatDuration(timesheetDay.totalDurationInMinutes)}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className='bg-sky-800 drop-shadow  border-b border-sky-200 sticky bottom-0 px-6 py-3 whitespace-nowrap' colSpan={maxNumberOfEntries.length + 2}>
            <span>Total hours: {formatTotalHours(props.daysList)}</span>
            <span>&nbsp;|&nbsp;</span>
            <span>Extra hours (8h/day): {formatExtraHours(props.daysList)}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TimesheetTable;
