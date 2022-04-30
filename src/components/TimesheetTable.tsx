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
    <table className='table-auto border-collapse border border-sky-200 w-full'>
      <caption>Timesheet</caption>
      <thead>
        <tr>
          <th className='bg-sky-900 border border-sky-200 sticky top-0'>Day</th>
          {maxNumberOfEntries.map((_, i) => <th className='bg-sky-900 border border-sky-200 sticky top-0' key={i}>Entry {i+1}</th>)}
          <th className='bg-sky-900 border border-sky-200 sticky top-0'>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.daysList.map((timesheetDay) => {
          return (
            <tr key={formatDay(timesheetDay.date)}>
              <td className='border border-sky-200'>{formatDay(timesheetDay.date)}</td>
              {maxNumberOfEntries.map((_, i) => {
                const entry = timesheetDay.intervalsAsEntries[i];

                return (
                  <td className='border border-sky-200' key={i}>
                    {entry ? formatHourOfDay(entry) : '-'}
                  </td>
                );
              })}
              <td className='border border-sky-200'>
                {formatDuration(timesheetDay.totalDurationInMinutes)}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className='bg-sky-900 drop-shadow  border border-sky-200 sticky bottom-0' colSpan={maxNumberOfEntries.length + 2}>
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
