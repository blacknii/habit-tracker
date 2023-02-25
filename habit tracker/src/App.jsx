import styles from "./App.module.css";
import Dashboard from "./components/dashboard/Dashboard";
import Header from './components/header/Header'

function App() {
  return (
    <div className={styles.container}>
      <Header/>
      <Dashboard/>
    </div>
  )
}

export default App
