import React from 'react';
import Header from '../components/Header';
import RepoCard from '../components/RepoCard';

import styles from '../styles/pages/Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <RepoCard
          repo={{
            id: 'repo1',
            name: 'Numconsigo',
            description: 'Um repositório muito legal e pá',
            owner: 'Mylleninha'
          }}
        />
      </main>
    </div>
  );
}

export default Dashboard;