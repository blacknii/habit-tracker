import styles from "./App.module.css";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import NewHabit from "./components/newHabit/NewHabit";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Dashboard />
      <NewHabit />
    </div>
  );
}

export default App;
