import Link from 'next/link';
import React from 'react';
import { MdDelete, MdPerson } from 'react-icons/md';

import styles from '../styles/components/RepoCard.module.css';

function RepoCard({ repo }) {
  function handleDelete(event) {
    event.preventDefault();
  }

  return (
    <Link href={`/repos/${repo.id}`}>
      <div className={styles.card}>
        <span>{repo.name}</span>

        <span>{repo.description}</span>

        <div>
          <MdPerson />
          <span>{repo.owner}</span>
        </div>

        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleDelete}
        >
          <MdDelete />
        </button>
      </div>
    </Link>
  );
}

export default RepoCard;
