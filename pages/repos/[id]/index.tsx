import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdFileUpload } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

import styles from '../../../styles/pages/Repo.module.css';

function List() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.containerOptions}>
          <Button>
            <MdFileUpload />
            <span>Enviar Modelo</span>
          </Button>
          <Link href={`/repos/${router.query.id}/settings`}>
            <a>
              <Button>
                <GoGear />
              </Button>
            </a>
          </Link>
        </div>

        <div className={styles.bodyTable}>
          <table className={styles.tableModels}>

            <tr>
              <th>
                <button type="button" className={styles.columnName}>Nome</button>
              </th>
              <th className={styles.column}>
                <button type="button" className={styles.buttonOptions}>Versão</button>
              </th>
              <th>
                <button type="button" className={styles.buttonOptions}>Tipo</button>
              </th>
              <th>
                <button type="button" className={styles.buttonOptions}>Métricas</button>
              </th>
              <th>
                <button type="button" className={styles.buttonOptions}>Framework</button>
              </th>
              <th>
                <button type="button" className={styles.buttonOptions}>Ações</button>
              </th>
            </tr>

            <tr className={styles.modelData}>
              <td className={styles.labelInfoName}>
                <span>modelo_1_exemplo.h5</span>
              </td>
              <td className={styles.labelInfo}>
                <span>1.0</span>
              </td>
              <td className={styles.labelInfo}>
                <span>Classificação</span>
              </td>
              <td className={styles.labelInfo}>
                <span>90 acc</span>
              </td>
              <td className={styles.labelInfo}>
                <span>Kensorflow</span>
              </td>
              <td>
                <button type="button" className={styles.buttonDotDotDot}>
                  <BsThreeDotsVertical />
                </button>
              </td>
            </tr>
          </table>

        </div>

      </main>
    </div >
  );
}

export default List;
