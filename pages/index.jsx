import React from 'react';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';

import Button from '../components/Button';

import styles from '../styles/pages/Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="assets/logo.svg" alt="AI Hub" className={styles.logo} />

        <Link href="/dashboard">
          <Button>
            <FiLogIn />
            <span>Login</span>
          </Button>
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.row}>
          <img src="assets/undraw_Maintenance.svg" alt="Gerenciando modelos" />
          <p>Gerencie seus modelos facilmente</p>
        </div>

        <div className={styles.row}>
          <p>Tenha acesso aos seus modelos em qualquer lugar</p>
          <img src="assets/undraw_File_sync.svg" alt="Modelos sincronizados" />
        </div>
      </main>
    </div>
  );
}

export default Home;
