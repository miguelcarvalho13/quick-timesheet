import React, { SyntheticEvent, useState } from "react";

interface TooltipProps {
  button: React.ReactNode,
  children: React.ReactNode
}

function Tooltip({ button, children }: TooltipProps) {
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isTooltipOpenThroughClick, setTooltipOpenThroughClick] = useState(false);

  function openTooltip(event: SyntheticEvent): void {
    setTooltipOpen(true);

    if (['focus', 'click'].includes(event.type)) {
      setTooltipOpenThroughClick(true);
    }
  }

  function closeTooltip(): void {
    setTooltipOpen(false);
    setTooltipOpenThroughClick(false);
  }

  function closeTooltipOnMouseLeave(): void {
    if (!isTooltipOpenThroughClick) {
      setTooltipOpen(false);
    }
  }

  return (
    <>
      <button
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltipOnMouseLeave}
        onClick={openTooltip}
        onBlur={closeTooltip}
        onFocus={openTooltip}
      >
        {button}
      </button>
      <div
        className={`absolute bg-sky-600 font-thin px-3 py-2 rounded-lg shadow-md text-sm transition-opacity z-50 ${isTooltipOpen ? 'opacity-100' : 'invisible opacity-0'}`}
        role='tooltip'
      >
        {children}
      </div>
    </>
  );
}

export default Tooltip;
