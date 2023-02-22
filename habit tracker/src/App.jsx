import styles from "./App.module.css";
import DashboardLeft from "./components/dashboard/dashboardLeft/DashboardLeft";
import DashboardRight from "./components/dashboard/dashboardRight/DashboardRight";
import Header from './components/header/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <div>
      <DashboardLeft/>
      <DashboardRight/>
      </div>
    </div>
  )
}

export default App
