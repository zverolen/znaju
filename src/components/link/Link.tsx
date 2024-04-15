import { NavLink } from "react-router-dom"

interface LinkProps {
  name: string;
  statNum: number;
  statPercent: number;
  id: string;
  route: string;
}

const Link = ({}: LinkProps) => {
  return (
    <>
      <NavLink />
    </>
  )
}

export default Link