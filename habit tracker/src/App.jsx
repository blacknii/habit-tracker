import styles from "./App.module.css";
import Modal from "./components/UI/Modal";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import NewHabit from "./components/newHabit/NewHabit";
import { useSelector } from "react-redux";

function App() {
  const { isModalActive } = useSelector((state) => state.newHabit);
  return (
    <div className={styles.container}>
      {/* <Modal>
        <p>test</p>
      </Modal> */}
      {isModalActive && <NewHabit />}
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
