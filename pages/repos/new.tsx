import React, { useState } from 'react';
import { useSession } from 'next-auth/client';

import Header from '../../components/Header';
import Button from '../../components/Button';

import styles from '../../styles/pages/NewRepo.module.css';
import api from '../../services/api';
import { useRouter } from 'next/router';

enum RepoVisibility {
  Unselected = null,
  Public = 0,
  Private = 1,
}

function NewRepo() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility ] = useState(RepoVisibility.Unselected);

  const [session, loadingSession] = useSession();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loadingSession) {
      return;
    }

    try {
      await api.post('/repos', { name, description, visibility, userEmail: session.user.email });
  
      alert('Repositório cadastrado com sucesso');

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="repo-name" className={styles.label}>
              Nome do repositório:
            </label>
            <input
              id="repo-name"
              className={styles.input}
              type="text"
              placeholder="Digite o nome do seu reposiório"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="repo-description" className={styles.label}>
              Descrição:
            </label>
            <textarea
              id="repo-description"
              className={styles.input}
              placeholder="Faça uma breve descrição sobre o repositório"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <p className={styles.label}>Visibilidade:</p>

            <div>
              <input
                id="repo-public"
                type="radio"
                name="visibility"
                value={RepoVisibility.Public}
                checked={visibility === RepoVisibility.Public}
                onChange={event => setVisibility(Number(event.target.value))}
              />
              <label htmlFor="repo-public" className={styles.label}>
                Público
              </label>
            </div>

            <div>
              <input
                id="repo-private"
                type="radio"
                name="visibility"
                value={RepoVisibility.Private}
                checked={visibility === RepoVisibility.Private}
                onChange={event => setVisibility(Number(event.target.value))}
              />
              <label htmlFor="repo-private" className={styles.label}>
                Privado
              </label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">
              <span className={styles.buttonText}>Criar repositório</span>
            </Button>
          </div>
        </form>

        <img
          src="/assets/undraw_Filing_system.svg"
          alt="Cadastrando repositório"
        />
      </main>
    </div>
  );
}

export default NewRepo;
