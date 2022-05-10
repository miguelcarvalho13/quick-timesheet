import {
  formatDay,
  formatDuration,
  formatExtraHours,
  formatHourOfDay,
  formatTotalHours,
} from '../formatters/DateTime';
import TimesheetDay from '../models/TimesheetDay';
import getValidations from '../validators/TimesheetDayValidator';
import ValidationsTooltip from './ValidationsTooltip';

interface TimesheetTableProps {
  daysList: TimesheetDay[];
}

function TimesheetTable(props: TimesheetTableProps) {
  if (!props.daysList.length) {
    return null;
  }

  const validations = getValidations(props.daysList);
  const maxNumberOfEntries = Array.from({
    length: Math.max(...props.daysList.map((d) => d.intervalsAsEntries.length)),
  });

  return (
    <div className="overflow-x-auto relative rounded-lg shadow-lg">
      <table className="bg-slate-800 table-auto text-left w-full">
        <caption className="sr-only">Timesheet</caption>
        <thead className="bg-slate-700 sticky -top-1 text-sm uppercase">
          <tr>
            <th className="px-6 py-3 whitespace-nowrap">Day</th>
            {maxNumberOfEntries.map((_, i) => {
              return (
                <th className="px-6 py-3 whitespace-nowrap" key={i}>
                  Entry {i + 1}
                </th>
              );
            })}
            <th className="px-6 py-3 whitespace-nowrap">Total</th>
          </tr>
        </thead>
        <tbody className="text-slate-100 font-thin">
          {props.daysList.map((timesheetDay, timesheetDayIndex) => {
            return (
              <tr
                className="border-b border-slate-600"
                key={`${formatDay(timesheetDay.date)}-${timesheetDayIndex}`}
              >
                <td className="px-6 py-3 text-slate-50 flex font-normal items-center whitespace-nowrap">
                  <span>{formatDay(timesheetDay.date)}</span>
                  <span>
                    <ValidationsTooltip
                      validations={validations.get(timesheetDay)}
                    />
                  </span>
                </td>
                {maxNumberOfEntries.map((_, i) => {
                  const entry = timesheetDay.intervalsAsEntries[i];

                  return (
                    <td className="px-6 py-3 whitespace-nowrap" key={i}>
                      {entry ? formatHourOfDay(entry) : '-'}
                    </td>
                  );
                })}
                <td className="px-6 py-3 whitespace-nowrap">
                  {formatDuration(timesheetDay.totalDurationInMinutes)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-slate-700 bottom-0 sticky">
          <tr>
            <td
              className="px-6 py-3 whitespace-nowrap"
              colSpan={maxNumberOfEntries.length + 2}
            >
              <span>Total hours: {formatTotalHours(props.daysList)}</span>
              <span>&nbsp;|&nbsp;</span>
              <span>
                Extra hours (8h/day): {formatExtraHours(props.daysList)}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TimesheetTable;
