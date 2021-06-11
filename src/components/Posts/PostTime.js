import { useTimeCalculation } from "../../hooks/useTimeCalculation"

export default function PostTime({
  children
}) {
  const { diffTime } = useTimeCalculation(children);
  return (
    <span className="ass1-section__passed">{diffTime}</span>
  )
}