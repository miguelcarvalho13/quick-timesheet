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
    <div className='overflow-x-auto relative rounded-lg shadow-md'>
      <table className='table-auto w-full text-left'>
        <caption className='sr-only'>Timesheet</caption>
        <thead className='bg-sky-800 sticky -top-1 text-sm uppercase'>
          <tr>
            <th className='px-6 py-3 whitespace-nowrap'>Day</th>
            {maxNumberOfEntries.map((_, i) => {
              return (
                <th className='px-6 py-3 whitespace-nowrap' key={i}>
                  Entry {i+1}
                </th>
              );
            })}
            <th className='px-6 py-3 whitespace-nowrap'>Total</th>
          </tr>
        </thead>
        <tbody className='text-sky-100 font-thin'>
          {props.daysList.map((timesheetDay) => {
            return (
              <tr className='border-b border-sky-700' key={formatDay(timesheetDay.date)}>
                <td className='px-6 py-3 text-sky-50 font-normal whitespace-nowrap'>{formatDay(timesheetDay.date)}</td>
                {maxNumberOfEntries.map((_, i) => {
                  const entry = timesheetDay.intervalsAsEntries[i];

                  return (
                    <td className='px-6 py-3 whitespace-nowrap' key={i}>
                      {entry ? formatHourOfDay(entry) : '-'}
                    </td>
                  );
                })}
                <td className='px-6 py-3 whitespace-nowrap'>
                  {formatDuration(timesheetDay.totalDurationInMinutes)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className='bg-sky-800 bottom-0 sticky'>
          <tr>
            <td className='px-6 py-3 whitespace-nowrap' colSpan={maxNumberOfEntries.length + 2}>
              <span>Total hours: {formatTotalHours(props.daysList)}</span>
              <span>&nbsp;|&nbsp;</span>
              <span>Extra hours (8h/day): {formatExtraHours(props.daysList)}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TimesheetTable;
