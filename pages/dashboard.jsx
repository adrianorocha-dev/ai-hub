import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Header from '../components/Header';
import RepoCard from '../components/RepoCard';

import styles from '../styles/pages/Dashboard.module.css';

function Dashboard() {
  const [session, loadingSession] = useSession();
  const router = useRouter();

  if (typeof window === 'undefined' && loadingSession) {
    return null;
  }

  if (!session) {
    router.replace('/');

    return null;
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <RepoCard
          repo={{
            id: 'repo1',
            name: 'Numconsigo',
            description: 'Um repositório muito legal e pá',
            owner: 'Mylleninha',
          }}
        />
      </main>
    </div>
  );
}

export default Dashboard;
