import { useAppSelector } from '../../app/hooks'

import { selectPhrasesStatus, } from "./phrasesSlice"

import Practice from "../../components/practice/Practice"
import SessionOverview from "../../components/sessionOverview/SessionOverview"

export default function Phrases() {
  const status = useAppSelector(selectPhrasesStatus)

  let practiceContent
  let sessionContent

  if (status === 'loading') {
    console.log('loading')
  } else if (status === 'success') {
    
    practiceContent =  <Practice />
    sessionContent = <SessionOverview /> 

  } else if (status === 'failed') {
    console.log('error')
  }

  return (
    <>
      {practiceContent}
      {sessionContent}
    </>
  )
}