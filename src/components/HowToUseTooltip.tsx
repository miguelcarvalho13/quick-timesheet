import QuestionMarkIcon from './Icons/QuestionMark';
import Tooltip from './Tooltip';

function HowToUseTooltip() {
  return (
    <Tooltip
      button={
        <span
          className="inline-block align-middle ml-2 -mt-2"
          aria-label="How to use tooltip"
        >
          <QuestionMarkIcon />
        </span>
      }
    >
      <h3 className="font-medium">How to use</h3>
      <p role="paragraph">
        Pass dates (in the format DD/MM/YYYY) followed by line breaks with its
        range of intervals (in the format HH:mm-HH:mm). e.g:
      </p>
      <p role="paragraph">
        22/12/2022
        <br />
        07:15-12:15
        <br />
        13:15-17:00
        <br />
        <br />
        23/12/2022
        <br />
        06:20-09:15
        <br />
        10:50-12:30
        <br />
        13:40-17:10
        <br />
        ...
      </p>
    </Tooltip>
  );
}

export default HowToUseTooltip;
