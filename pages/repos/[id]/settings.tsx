import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { IoMdSave } from 'react-icons/io';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

import api from '../../../services/api';

import styles from '../../../styles/pages/SettingsRepo.module.css';
import { MdClose } from 'react-icons/md';

enum RepoVisibility {
  Unselected = null,
  Public = 0,
  Private = 1,
}

function RepoSettings() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility ] = useState(RepoVisibility.Unselected);

  const [memberEmail, setMemberEmail] = useState('');
  const [members, setMembers] = useState([]);

  const [session, loadingSession] = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!router.query.id) {
        return;
      }

      const response = await api.get(`/repos/${router.query.id}`);

      const { name, description, visibility, members } = response.data;

      setName(name);
      setDescription(description);
      setVisibility(visibility);
      setMembers(members);
    })()
  }, [router.query.id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loadingSession) {
      return;
    }

    try {
      await api.patch(
        `/repos/${router.query.id}`,
        {
          name,
          description,
          visibility,
          userEmail: session.user.email,
          memberEmails: members.map(member => member.email)
        });
  
      alert('Repositório alterado com sucesso');

      router.push('/dashboard');
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error);
      }
    }
  }

  async function handleAddMember() {
    if (members.some(member => member.email === memberEmail)) {
      return;
    }

    try {
      const response = await api.get(`/users/${memberEmail}`);

      setMembers(current => [...current, response.data])
    } catch(error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error);
      }
    }
  }

  async function handleRemoveMember(id: string) {
    setMembers(current => current.filter(member => member.id !== id));
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
                  placeholder="Digite o email do usuário"
                  value={memberEmail}
                  onChange={event => setMemberEmail(event.target.value)}
                />

                <Button type="button" onClick={handleAddMember}>
                  <span className={styles.buttonText}>Dar acesso</span>
                </Button>

              </div>
            </div>

            <ul className={styles.membersList}>
              {members.map(member => (
                <li key={member.id}>
                  <div className={styles.memberItem}>
                    <h1>{member.name}</h1>
                    <h2>{member.email}</h2>
                    <button type="button" className={styles.buttonRemoveMember} onClick={() => handleRemoveMember(member.id)}>
                      <MdClose />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
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
