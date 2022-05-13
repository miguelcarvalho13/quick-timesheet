import { useMemo } from 'react';
import TimesheetDay from '../../models/TimesheetDay';
import { build } from '../../utils/TimesheetTableData';
import getValidations from '../../validators/TimesheetDayValidator';
import SummarizedTotal from './SummarizedTotal';

interface TimesheetTableProps {
  daysList: TimesheetDay[];
}

function TimesheetTable(props: TimesheetTableProps) {
  const validations = useMemo(
    () => getValidations(props.daysList),
    [props.daysList],
  );
  const { columns, rows } = useMemo(
    () => build(props.daysList, validations),
    [props.daysList, validations],
  );

  if (!props.daysList.length) return null;

  return (
    <div className="overflow-x-auto relative rounded-lg shadow-lg">
      <table className="bg-slate-800 table-auto text-left w-full">
        <caption className="sr-only">Timesheet</caption>
        <thead className="bg-slate-700 sticky -top-1 text-sm uppercase">
          <tr>
            {columns.map(({ name }, index) => {
              return (
                <th className="px-6 py-3 whitespace-nowrap" key={index}>
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-slate-100 font-thin">
          {rows.map((timesheetDayRow, rowIndex) => {
            return (
              <tr
                className="border-b border-slate-600"
                key={`${timesheetDayRow.date}-${rowIndex}`}
              >
                {columns.map(({ cell }, colIndex) => {
                  return (
                    <td className="px-6 py-3 whitespace-nowrap" key={colIndex}>
                      {cell.render(timesheetDayRow)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-slate-700 bottom-0 sticky">
          <tr>
            <td
              className="px-6 py-3 whitespace-nowrap"
              colSpan={columns.length}
            >
              <SummarizedTotal timesheetDays={props.daysList} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TimesheetTable;
