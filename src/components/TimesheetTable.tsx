import {
  formatDay,
  formatDuration,
  formatExtraHours,
  formatHourOfDay,
  formatTotalHours,
} from '../formatters/DateTime';
import { formatValidation } from '../formatters/Validator';
import TimesheetDay from '../models/TimesheetDay';
import getValidations from '../validators/TimesheetDayValidator';
import DangerIcon from './Icons/Danger';
import Tooltip from './Tooltip';

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
      <table className="bg-sky-800 table-auto text-left w-full">
        <caption className="sr-only">Timesheet</caption>
        <thead className="bg-sky-700 sticky -top-1 text-sm uppercase">
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
        <tbody className="text-sky-100 font-thin">
          {props.daysList.map((timesheetDay, timesheetDayIndex) => {
            return (
              <tr
                className="border-b border-sky-600"
                key={`${formatDay(timesheetDay.date)}-${timesheetDayIndex}`}
              >
                <td className="px-6 py-3 text-sky-50 flex font-normal items-center whitespace-nowrap">
                  <span>{formatDay(timesheetDay.date)}</span>
                  <span>
                    {validations.has(timesheetDay) && (
                      <Tooltip
                        button={
                          <span
                            className="inline-block align-middle ml-2 -mt-2"
                            aria-label="Possible issues tooltip"
                          >
                            <DangerIcon />
                          </span>
                        }
                      >
                        <ul className="list-disc pl-4">
                          {Array.from(validations.get(timesheetDay) ?? []).map(
                            (v) => {
                              return <li key={v}>{formatValidation(v)}</li>;
                            },
                          )}
                        </ul>
                      </Tooltip>
                    )}
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
        <tfoot className="bg-sky-700 bottom-0 sticky">
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
