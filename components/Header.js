import React from 'react'
import {MdAdd, MdSearch} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import styles from '../styles/components/Header.module.css';
import Button from './Button';

function Header() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <header className={styles.header}>
      <img src="assets/logo.svg" alt="AI Hub" className={styles.logo} />

      <div className={styles.controls}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input type="text" placeholder="Buscar repositórios" />

          <button className={`${styles.searchButton} ${styles.roundButton}`} type="submit">
            <MdSearch />
          </button>
        </form>

        <button className={styles.roundButton}>
          <MdAdd />
        </button>

        <span className={styles.userName}>Fulano</span>

        <Button>
          <FiLogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;