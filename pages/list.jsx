import React from 'react';
import { MdFileUpload } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs'
import Header from '../components/Header';

import Button from '../components/Button';

import styles from '../styles/pages/List.module.css';

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
            <GoGear/>
          </Button>
        </div>
        <div className={styles.containerLabels}>
          <div>
            <a>Nome</a>
          </div>
          <div className={styles.containerLabels}>
            <a className={styles.nameOptions}>Versão</a>
            <a className={styles.nameOptions}>Tipo</a>
            <a className={styles.nameOptions}>Métricas</a>
            <a className={styles.nameOptions}>Framework</a>
            <a className={styles.nameOptions}>Ações</a>
          </div>
        </div>
        <div className={styles.containerItem}>
          <div>
            <a>modelo_1_exemplo.h5</a>
          </div>
          <div className={styles.containerItem}>
            <a className={styles.nameOptions}>1.0</a>
            <a className={styles.nameOptions}>Classificação</a>
            <a className={styles.nameOptions}>90 acc</a>
            <a className={styles.nameOptions}>Kensorflow</a>
            <a className={styles.nameOptions}>
              <Button>
                <BsThreeDotsVertical />
              </Button>
            </a>
          </div>
        </div>
        
      </main>
    </div>
  );
}

export default List;
