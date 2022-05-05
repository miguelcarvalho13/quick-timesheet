import { formatValidation } from '../formatters/Validation';
import { ValidationTypes } from '../validators/TimesheetDayValidator';
import DangerIcon from './Icons/Danger';
import Tooltip from './Tooltip';

interface ValidationsTooltipProps {
  validations: Set<ValidationTypes> | undefined;
}

function ValidationsTooltip(props: ValidationsTooltipProps) {
  if (!props.validations) return null;

  return (
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
      <ul
        aria-label="Possible issues"
        className="before:content-[attr(aria-label)] before:font-medium before:-ml-4 list-disc pl-4"
      >
        {Array.from(props.validations).map((validation) => {
          return <li key={validation}>{formatValidation(validation)}</li>;
        })}
      </ul>
    </Tooltip>
  );
}

export default ValidationsTooltip;
