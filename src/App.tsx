import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'

import { fetchPhrases, selectPhrasesStatus } from './features/phrases/phrasesSlice'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import SidebarDesktop from './components/sidebarDesktop/SidebarDesktop'

function App() {

  const dispatch = useAppDispatch()
  const status = useAppSelector(selectPhrasesStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhrases())
    }
  }, [status, dispatch])

  return (
    <div className="layout site-frame">
      <Header />
     
      <aside>
        <SidebarDesktop />
      </aside>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App
