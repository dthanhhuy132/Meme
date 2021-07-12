import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('vi');
dayjs.extend(relativeTime);

export default function useTimeCalculation(time) {

  const createdDate = dayjs(time)
  const currentDate = dayjs();
  const relativeTimeStr = createdDate.from(currentDate);
  return {
    relativeTimeStr
  }
}