import styles from "./App.module.css";
import BedtimeModal from "./components/bedtime/BedtimeModal";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import NewHabit from "./components/newHabit/NewHabit";
import { useSelector } from "react-redux";

function App() {
  const { isModalActive } = useSelector((state) => state.newHabit);
  const { isModalVisible } = useSelector((state) => state.bedtime);

  return (
    <div className={styles.container}>
      {isModalVisible && <BedtimeModal />}
      {isModalActive && <NewHabit />}
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
