import React from 'react';
import Header from '../components/Header';
import RepoCard from '../components/RepoCard';

import styles from '../styles/pages/Search.module.css';

function Search(){
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Seus repositórios</h1>
        </div>
        <ul className={styles.containerCard}>
          <li className={styles.itemCard}>
            <RepoCard 
            repo={{
              id: 'repo1',
              name: 'Mondelez',
              description: 'Classificação de objetos',
              owner: 'João da Silva'
            }}/>
          </li>
          <li className={styles.itemCard}>
            <RepoCard 
            repo={{
              id: 'repo2',
              name: 'Nestlé',
              description: 'Detecção de objetos',
              owner: 'Pedro moura'
            }}/>
          </li>
          <li className={styles.itemCard}>
            <RepoCard 
            repo={{
              id: 'repo3',
              name: 'Vision Clear',
              description: 'Segmentação de pessoas',
              owner: 'Ana Maria Pereira'
            }}/>
          </li>
          <li className={styles.itemCard}>
            <RepoCard 
            repo={{
              id: 'repo4',
              name: 'NASA',
              description: 'Detecção de Rochas',
              owner: 'Luiz de Sá'
            }}/>
          </li>
        </ul>
        <div>
          <h1 className={styles.title}>Em todo o AI Hub</h1>
        </div>
        <ul className={styles.containerCard}>
          <li className={styles.itemCard}>
            <RepoCard 
              repo={{
                id: 'repo5',
                name: 'UFPI',
                description: 'Segmentação de Melanoma',
                owner: 'Vitoria de Carvalho'
              }}/>
            </li>
            <li className={styles.itemCard}>
              <RepoCard 
              repo={{
                id: 'repo6',
                name: 'IFPI',
                description: 'Classificação Pulmonares',
                owner: 'Adriano de Oliveira'
              }}/>
            </li>
            <li className={styles.itemCard}>
              <RepoCard 
              repo={{
                id: 'repo7',
                name: 'UESPI',
                description: 'Detecção de Glaucoma',
                owner: 'Patrick Ryan'
              }}/>
            </li>
          </ul>
      </main>
    </div>
  );
}

export default Search;