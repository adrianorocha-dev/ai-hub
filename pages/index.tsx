import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FiLogIn } from 'react-icons/fi';

import Button from '../components/Button';

import styles from '../styles/pages/Home.module.css';
import api from '../services/api';

function Home() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const { email, name, image: avatarUrl } = session.user;

      api.post('/users', { email, name, avatarUrl });
      router.push('/dashboard');
    }
  }, [session]);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="assets/logo.svg" alt="AI Hub" className={styles.logo} />

        <Button onClick={() => signIn()}>
          <FiLogIn />
          <span>Login</span>
        </Button>
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
