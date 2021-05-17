import React from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';

import styles from '../../styles/pages/NewRepo.module.css';

function NewRepo() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="repo-name" className={styles.label}>
              Nome do repositório:
            </label>
            <input
              id="repo-name"
              className={styles.input}
              type="text"
              placeholder="Digite o nome do seu reposiório"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="repo-description" className={styles.label}>
              Descrição:
            </label>
            <textarea
              id="repo-description"
              className={styles.input}
              type="text"
              placeholder="Faça uma breve descrição sobre o repositório"
            />
          </div>

          <div className={styles.inputGroup}>
            <p className={styles.label}>Visibilidade:</p>

            <div>
              <input
                id="repo-public"
                type="radio"
                value="publico"
                name="gender"
              />
              <label htmlFor="repo-public" className={styles.label}>
                Público
              </label>
            </div>

            <div>
              <input
                id="repo-private"
                type="radio"
                value="privado"
                name="gender"
              />
              <label htmlFor="repo-private" className={styles.label}>
                Privado
              </label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button>
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
