import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Duration from 'dayjs/plugin/duration';

dayjs.extend(CustomParseFormat);
dayjs.extend(Duration);
