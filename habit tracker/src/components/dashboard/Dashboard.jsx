import React from 'react';
import styles from './Dashboard.module.css';
import DashboardLeft from './dashboardLeft/DashboardLeft';
import DashboardRight from './dashboardRight/DashboardRight';

function Dashboard() {
  return <div className={styles.container}>
      <DashboardLeft/>
      <DashboardRight/>
  </div>
};

export default Dashboard;
