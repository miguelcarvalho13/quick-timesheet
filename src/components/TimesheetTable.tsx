import DateTime from '../formatters/DateTime';
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
            <tr key={DateTime.formatDay(timesheetDay.date)}>
              <td>{DateTime.formatDay(timesheetDay.date)}</td>
              {maxNumberOfEntries.map((_, i) => {
                const entry = timesheetDay.intervalsAsEntries[i];

                return (
                  <td key={i}>
                    {entry ? DateTime.formatHourOfDay(entry) : '-'}
                  </td>
                );
              })}
              <td>{DateTime.formatMinutes(sumAll(timesheetDay.timeIntervals.map(x => x.duration)))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function sumAll(ns: number[]): number {
  return ns.reduce((x, y) => x + y, 0);
}

export default TimesheetTable;
