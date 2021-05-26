import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { IoMdSave } from 'react-icons/io';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

import api from '../../../services/api';

import styles from '../../../styles/pages/SettingsRepo.module.css';

enum RepoVisibility {
  Unselected,
  Public,
  Private,
}

function RepoSettings() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility ] = useState(RepoVisibility.Unselected);

  const [session, loadingSession] = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!router.query.id) {
        return;
      }

      const response = await api.get(`/repos/${router.query.id}`);

      const { name, description, visibility } = response.data;

      setName(name);
      setDescription(description);
      setVisibility(visibility);
    })()
  }, [router.query.id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loadingSession) {
      return;
    }

    try {
      await api.patch(`/repos/${router.query.id}`, { name, description, visibility });
  
      alert('Repositório alterado com sucesso');

      router.push('/dashboard');
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Configurações do repositório</h1>

          <div className={styles.permission}>
            <div className={styles.inputGroup}>
              <label htmlFor="repo-membros" className={styles.label}>
                Membros:
              </label>

              <div className={styles.inputPermission}>
                <input
                  id="repo-membros"
                  className={styles.input}
                  type="text"
                  placeholder="Digite um nome de usuário"
                  disabled
                />

                <Button disabled>
                  <span className={styles.buttonText}>Dar acesso</span>
                </Button>
              </div>
            </div>
          </div>

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
              <IoMdSave />
              <span className={styles.buttonText}>Salvar</span>
            </Button>
          </div>
        </form>

        <img src="/assets/undraw_Maintenance.svg" alt="Gerenciando modelos" />
      </main>
    </div>
  );
}

export default RepoSettings;
