import { formatExtraHours, formatTotalHours } from '../../formatters/DateTime';
import TimesheetDay from '../../models/TimesheetDay';

interface TimesheetTotalProps {
  timesheetDays: TimesheetDay[];
}

function TimesheetTotal({ timesheetDays }: TimesheetTotalProps) {
  return (
    <p role="paragraph">
      <span>Total hours: {formatTotalHours(timesheetDays)}</span>
      <span> | </span>
      <span>Extra hours (8h/day): {formatExtraHours(timesheetDays)}</span>
    </p>
  );
}

export default TimesheetTotal;
