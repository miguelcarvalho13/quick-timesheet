import HowToUseTooltip from './HowToUseTooltip';

function Navbar() {
  return (
    <nav className="backdrop-blur bg-slate-800/70 px-4 py-4 shadow-md sticky top-0 z-30">
      <div className="flex item-center justify-between w-full">
        <a href={window.location.href}>
          <span className="font-bold self-center text-xl whitespace-nowrap">
            Quick Timesheet
          </span>
        </a>
        <div>
          <HowToUseTooltip className="mx-4 max-w-[calc(100%-2rem)] right-0 w-[400px]" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
