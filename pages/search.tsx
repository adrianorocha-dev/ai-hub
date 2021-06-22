import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router'
import React from 'react';

import { Repo, RepoVisibility } from '../@types/Repo';
import Header from '../components/Header';
import RepoCard from '../components/RepoCard';
import { useFetch } from '../hooks/useFetch';

import styles from '../styles/pages/Search.module.css';

function Search() {
  const [session, loadingSession] = useSession();

  const router = useRouter();

  console.log(router);

  const { searchTerm } = router.query;

  const {data: repos} = useFetch<Repo[]>(`/repos?userEmail=${session?.user?.email}&searchTerm=${searchTerm}`);

  const ownedRepos = repos?.filter(repo => repo.owner.email === session.user.email);
  const contributingRepos = repos?.filter(repo => repo.visibility === RepoVisibility.Public || repo.members.some(member => member.email === session.user.email));

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Seus repositórios</h1>
        </div>
        <ul className={styles.containerCard}>
          {ownedRepos ?
          ownedRepos.map(repo => (
            <li key={repo.id} className={styles.itemCard}>
              <RepoCard repo={repo} owner={repo.owner.name}/>
            </li>
          )) : (
            <p>Nenhum resultado encontrado.</p>
          )}
        </ul>
        
        <div>
          <h1 className={styles.title}>Em todo o AI Hub</h1>
        </div>
        <ul className={styles.containerCard}>
        {contributingRepos ?
          contributingRepos.map(repo => (
            <li key={repo.id} className={styles.itemCard}>
              <RepoCard repo={repo} owner={repo.owner.name}/>
            </li>
          )) : (
            <p>Nenhum resultado encontrado.</p>
          )}
        </ul>
      </main>
    </div>
  );
}

export default Search;
