import { NavLink } from 'react-router-dom'

import style from './SidebarItem.module.css'

interface StatsItemProps {
  name: string;
  statNum: number;
  statPercent: number;
  id: string;
  route: string;
}

const SidebarItem = ({ name, statNum, statPercent, id, route }: StatsItemProps) => {
  return (
    <NavLink id={id} to={route} data-testid={id} className={`${style.sidebar__item} link ${id}`}>
      <span>{name} </span>
      <span>{statNum} </span>
      <span>{`(${statPercent}%)`}</span>
    </NavLink>
  )
}

export default SidebarItem