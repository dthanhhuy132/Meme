export function useTimeCalculation(date) {

  let StriDate = new Date(date);
  let now = new Date()
  let Diff = (now - StriDate) / (60 * 60 * 24 * 1000);
  let DiffRound = Math.floor(Diff);
  let DiffSecond = (Diff - DiffRound) * 60

  let diffTime;
  let postDateA;

  //Láy thời gian
  if (DiffRound === 0) {
    if (DiffSecond <= 1) {
      diffTime = '1 phút trước';
    } else if (DiffSecond > 1 && DiffSecond < 60) {
      diffTime = `${Math.floor(DiffSecond)} phút trước`
    } else {
      diffTime = `${Math.floor(DiffSecond * 24)} giờ trước`
    }
  } else if (DiffRound > 0 && DiffRound < 30) {
    diffTime = `${DiffRound} ngày trước`;
  } else if (DiffRound >= 30 && DiffRound < 365) {
    diffTime = `${Math.floor(DiffRound / 30)} tháng trước`;
  } else {
    diffTime = `${Math.floor(DiffRound / 365)} năm trước`;
  }
  // Lấy ngày
  if (StriDate) {
    postDateA = `${StriDate.getDate()}/${StriDate.getMonth()}/${StriDate.getFullYear()}`
  }

  return {
    diffTime,
    postDateA
  }
}