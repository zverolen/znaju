import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

import SidebarItem from "../sidebarItem/SidebarItem"

import { 
  selectTotalNumberOfPhrases,
  selectNumberOfNewPhrases,
  selectNumberOfCorrectPhrases,
  selectNumberOfWrongPhrases,
} from '../../features/phrases/phrasesSlice'

import style from "./SidebarMobile.module.css"
import { copy } from "../../data/copy"

const sidebarCopy = copy.sideBar

export default function SidebarMobile() {
  // in research
  const allPhrasesNum: number = useAppSelector(selectTotalNumberOfPhrases)

  const newPhrasesNum: number = useAppSelector(selectNumberOfNewPhrases)
  const newPhrasesPercent: number = newPhrasesNum * 100 / allPhrasesNum
  
  const correctPhrasesNum: number = useAppSelector(selectNumberOfCorrectPhrases)
  const correctPhrasesPercent: number = correctPhrasesNum * 100 / allPhrasesNum

  const wrongPhrasesNum: number = useAppSelector(selectNumberOfWrongPhrases)
  const wrongPhrasesPercent: number = wrongPhrasesNum * 100 / allPhrasesNum

  return(
    <div id="stats" className={style.sidebarMobile}>
      <h2>{sidebarCopy.subheading}</h2>
      <nav>
        <SidebarItem route="/remaining" id="remaining" name="Осталось" statNum={newPhrasesNum} statPercent={newPhrasesPercent} />
        <SidebarItem route="/know" id="correct" name="Знаю!" statNum={correctPhrasesNum} statPercent={correctPhrasesPercent} />
        <SidebarItem route="/learn" id="wrong" name="Учу!" statNum={wrongPhrasesNum} statPercent={wrongPhrasesPercent} />
        <NavLink className="sidebar-link_separate link" data-testid="all" to="/all">Вся статистика</NavLink>
      </nav>
    </div>
  )
}