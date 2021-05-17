import React from 'react';
import { MdFileUpload } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Header from '../../components/Header';

import Button from '../../components/Button';

import styles from '../../styles/pages/Repo.module.css';

function List() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.containerOptions}>
          <Button>
            <MdFileUpload />
            <span>Enviar Modelo</span>
          </Button>
          <Button>
            <GoGear />
          </Button>
        </div>
        <div className={styles.containerLabels}>
          <div>
            <button type="button" className={styles.nameOptions}>
              Nome
            </button>
          </div>
          <div className={styles.containerLabels}>
            <button type="button" className={styles.nameOptions}>
              Versão
            </button>
            <button type="button" className={styles.nameOptions}>
              Tipo
            </button>
            <button type="button" className={styles.nameOptions}>
              Métricas
            </button>
            <button type="button" className={styles.nameOptions}>
              Framework
            </button>
            <button type="button" className={styles.nameOptions}>
              Ações
            </button>
          </div>
        </div>
        <div className={styles.containerItem}>
          <div>
            <span>modelo_1_exemplo.h5</span>
          </div>
          <div className={styles.containerItem}>
            <span className={styles.nameOptions}>1.0</span>
            <span className={styles.nameOptions}>Classificação</span>
            <span className={styles.nameOptions}>90 acc</span>
            <span className={styles.nameOptions}>Kensorflow</span>
            <button type="button" className={styles.nameOptions}>
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default List;
