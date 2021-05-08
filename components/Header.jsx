import React from 'react';
import Link from 'next/link';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

import Button from './Button';

import styles from '../styles/components/Header.module.css';

function Header() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <header className={styles.header}>
      <img src="/assets/logo.svg" alt="AI Hub" className={styles.logo} />

      <div className={styles.controls}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input type="text" placeholder="Buscar repositórios" />

          <button
            className={`${styles.searchButton} ${styles.roundButton}`}
            type="submit"
          >
            <MdSearch />
          </button>
        </form>

        <Link href="/repos/new">
          <button className={styles.roundButton} type="button">
            <MdAdd />
          </button>
        </Link>

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
