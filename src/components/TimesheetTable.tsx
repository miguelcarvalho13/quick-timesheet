import DateTime from '../formatters/DateTime';
import TimesheetDay from '../models/TimesheetDay';

interface TimesheetTableProps {
  daysList: TimesheetDay[]
}

function TimesheetTable(props: TimesheetTableProps) {
  if (!props.daysList.length) {
    return null;
  }

  const maxOfIntervals = Array.from({ length: Math.max(...props.daysList.map(d => d.timeIntervals.length)) })

  return (
    <table className='timesheet-table'>
      <thead>
        <tr>
          <th>Day</th>
          {maxOfIntervals.map((_, i) => <th key={i}>Interval {i+1}</th>)}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.daysList.map((timesheetDay) => {
          return (
            <tr key={DateTime.formatDay(timesheetDay.date)}>
              <td>{DateTime.formatDay(timesheetDay.date)}</td>
              {maxOfIntervals.map((_, i) => {
                const timeInterval = timesheetDay.timeIntervals[i];

                return (
                  <td key={i}>
                    {timeInterval ? DateTime.formatMinutes(timeInterval.duration) : '-'}
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
