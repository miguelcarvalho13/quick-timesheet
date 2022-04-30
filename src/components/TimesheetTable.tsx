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
    <table className='timesheet-table'>
      <caption>Timesheet</caption>
      <thead>
        <tr>
          <th>Day</th>
          {maxNumberOfEntries.map((_, i) => <th key={i}>Entry {i+1}</th>)}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.daysList.map((timesheetDay) => {
          return (
            <tr key={formatDay(timesheetDay.date)}>
              <td>{formatDay(timesheetDay.date)}</td>
              {maxNumberOfEntries.map((_, i) => {
                const entry = timesheetDay.intervalsAsEntries[i];

                return (
                  <td key={i}>
                    {entry ? formatHourOfDay(entry) : '-'}
                  </td>
                );
              })}
              <td>
                {formatDuration(timesheetDay.totalDurationInMinutes)}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={maxNumberOfEntries.length + 2}>
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
