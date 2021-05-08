import React from 'react';
import { MdFileUpload } from 'react-icons/md';
import Header from '../components/Header';

import Button from '../components/Button';

import styles from '../styles/pages/List.module.css';

function List() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div>
          <Button>
            <MdFileUpload />
            <span>Enviar Modelo</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

export default List;
