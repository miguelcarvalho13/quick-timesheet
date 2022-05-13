import React from 'react';
import ValidationsTooltip from '../components/ValidationsTooltip';
import {
  formatDay,
  formatDuration,
  formatHourOfDay,
} from '../formatters/DateTime';
import TimesheetDay from '../models/TimesheetDay';
import {
  ValidationMap,
  ValidationTypes,
} from '../validators/TimesheetDayValidator';

export interface TableColumn {
  name: string;
  cell: {
    render: (p: TimesheetRow) => React.ReactNode;
  };
}

export interface TimesheetRow {
  original: TimesheetDay;
  date: string;
  entries: string[];
  totalDuration: string;
  validations?: Set<ValidationTypes>;
}

export function build(
  timesheetDays: TimesheetDay[],
  validations: ValidationMap,
): {
  columns: TableColumn[];
  rows: TimesheetRow[];
} {
  return {
    columns: buildColumns(timesheetDays, validations),
    rows: buildRows(timesheetDays, validations),
  };
}

function buildColumns(
  timesheetDays: TimesheetDay[],
  validations: ValidationMap,
): TableColumn[] {
  if (!timesheetDays.length) return [];

  const maxNumberOfEntries = Array.from({
    length: Math.max(...timesheetDays.map((d) => d.intervalsAsEntries.length)),
  });
  const columns: TableColumn[] = [];

  columns.push({
    name: 'Day',
    cell: {
      render: ({ date, validations }) => {
        return (
          <div className="text-slate-50 flex font-normal items-center">
            <span>{date}</span>
            <span>
              <ValidationsTooltip validations={validations} />
            </span>
          </div>
        );
      },
    },
  });

  // push the "Entries" columns from 1 to n
  maxNumberOfEntries.forEach((_, index) => {
    columns.push({
      name: `Entry ${index + 1}`,
      cell: {
        render: (d) => d.entries[index] ?? '-',
      },
    });
  });

  columns.push({ name: 'Total', cell: { render: (d) => d.totalDuration } });

  return columns;
}

function buildRows(
  timesheetDays: TimesheetDay[],
  validations: ValidationMap,
): TimesheetRow[] {
  return timesheetDays.map((timesheetDay) => {
    return {
      original: timesheetDay,
      date: formatDay(timesheetDay.date),
      entries: timesheetDay.intervalsAsEntries.map((d) => formatHourOfDay(d)),
      totalDuration: formatDuration(timesheetDay.totalDurationInMinutes),
      validations: validations.get(timesheetDay),
    };
  });
}
