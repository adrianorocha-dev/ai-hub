import Link from 'next/link';
import React from 'react';
import { MdDelete, MdPerson } from 'react-icons/md';

import { Repo } from '../@types/Repo';

import styles from '../styles/components/RepoCard.module.css';

interface RepoCardProps {
  repo: Partial<Repo>;
  owner: string;
  onDelete: (repoId: string) => void
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, owner, onDelete }) => {
  async function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    onDelete(repo.id);
  }

  return (
    <Link href={`/repos/${repo.id}`}>
      <div className={styles.card}>
        <span>{repo.name}</span>

        <span>{repo.description}</span>

        <div>
          <MdPerson />
          <span>{owner}</span>
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
