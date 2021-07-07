import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Header from '../components/Header';
import RepoCard from '../components/RepoCard';

import styles from '../styles/pages/Dashboard.module.css';
import api from '../services/api';
import { Repo } from '../@types/Repo';
import { useFetch } from '../hooks/useFetch';

function Dashboard() {
  const [session, loadingSession] = useSession();
  const router = useRouter();

  const {data: repos, mutate: mutateRepos} = useFetch<Repo[]>(`/repos?userEmail=${session?.user?.email}`);

  useEffect(() => {
    if (!session?.user) {
      return;
    }
  }, [session?.user]);

  if (typeof window === 'undefined' && loadingSession) {
    return null;
  }

  if (!session) {
    router.replace('/');

    return null;
  }

  function deleteRepo(repoId: string) {
    const userConfirmed = confirm('Você tem certeza que deseja apagar esse repositório?');

    if (userConfirmed) {
      api.delete(`/repos/${repoId}`).catch(() => {
        mutateRepos(repos, true);
      });

      mutateRepos(repos.filter(repo => repo.id !== repoId), false);
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <ul className={styles.repoList}>
          {
            repos?.map(repo => (
              <li key={repo.id}>
                <RepoCard
                  repo={{
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                  }}
                  owner={repo.owner.name}
                  allowDelete={repo.owner.email === session.user?.email}
                  onDelete={deleteRepo}
                />
              </li>
            ))
          }
        </ul>

      </main>
    </div>
  );
}

export default Dashboard;
