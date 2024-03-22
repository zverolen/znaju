import { NavLink } from 'react-router-dom'

interface StatsItemProps {
  name: string;
  statNum: number;
  statPercent: number;
  id: string;
  route: string;
}

const StatsItem = ({ name, statNum, statPercent, id, route }: StatsItemProps) => {
  return (
    <NavLink id={id} to={route} data-testid={id}>
      <span>{name} </span>
      <span>{statNum} </span>
      <span>{`(${statPercent}%)`}</span>
    </NavLink>
  )
}

export default StatsItem