import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

import Home from "./home";

const App: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Home/>
    </div>
  )
}

export default App
