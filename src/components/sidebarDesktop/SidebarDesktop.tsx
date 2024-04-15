import { useLayoutEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

import SidebarItem from "../sidebarItem/SidebarItem"

import { 
  selectTotalNumberOfPhrases,
  selectNumberOfNewPhrases,
  selectNumberOfCorrectPhrases,
  selectNumberOfWrongPhrases,
} from '../../features/phrases/phrasesSlice'

import style from "./SidebarDesktop.module.css"
import { copy } from "../../data/copy"

type WindowSizeStatus = 'big' | 'small' | null

const sidebarCopy = copy.sideBar

export default function SidebarDesktop() {
  const [ windowSize, setWindowSize ] = useState<WindowSizeStatus>(null)

useLayoutEffect(() => {
    findWindowWidth()

    window.addEventListener('resize', handleWindowResize)

    function handleWindowResize() {
      findWindowWidth()
    } 

    // MEMO: triggers rerender
    function findWindowWidth() {
      if (window.innerWidth <= 560 ) {
        setWindowSize('small')
      } else {
        setWindowSize('big')
      }
    }

    //TODO: Add and test clean up
    // return window.removeEventListener('resize', handleWindowResize)  
  })

  // in research
  const allPhrasesNum: number = useAppSelector(selectTotalNumberOfPhrases)

  const newPhrasesNum: number = useAppSelector(selectNumberOfNewPhrases)
  const newPhrasesPercent: number = newPhrasesNum * 100 / allPhrasesNum
  
  const correctPhrasesNum: number = useAppSelector(selectNumberOfCorrectPhrases)
  const correctPhrasesPercent: number = correctPhrasesNum * 100 / allPhrasesNum

  const wrongPhrasesNum: number = useAppSelector(selectNumberOfWrongPhrases)
  const wrongPhrasesPercent: number = wrongPhrasesNum * 100 / allPhrasesNum

  const sidebarContentDesktop = <>
                                  <h2>{sidebarCopy.subheading}</h2>
                                  <nav>
                                    <SidebarItem route="/remaining" id="remaining" name="Осталось" statNum={newPhrasesNum} statPercent={newPhrasesPercent} />
                                    <SidebarItem route="/know" id="correct" name="Знаю!" statNum={correctPhrasesNum} statPercent={correctPhrasesPercent} />
                                    <SidebarItem route="/learn" id="wrong" name="Учу!" statNum={wrongPhrasesNum} statPercent={wrongPhrasesPercent} />
                                    <NavLink className="sidebar-link_separate link" data-testid="all" to="/all">Вся статистика</NavLink>
                                  </nav>
                                </>

  return(
    <div id="stats" className={style.sidebarDesktop}>
      {windowSize === 'big' ? sidebarContentDesktop : 'Mobile'}
    </div>
  )
}