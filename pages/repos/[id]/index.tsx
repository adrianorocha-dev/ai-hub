import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { MdFileUpload } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import CreateModalModal from '../../../components/CreateModelModal';
import EditModalModal from '../../../components/EditModelModal';

import { useFetch } from '../../../hooks/useFetch';

import { Model } from '../../../@types/Model';
import { Repo } from '../../../@types/Repo';

import styles from '../../../styles/pages/Repo.module.css';

function ViewRepo() {
  const [file, setFile] = useState<File>();
  const [editModelId, setEditModelId] = useState<string>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [session, sessionLoading] = useSession();
  const router = useRouter();

  const { data: models, mutate } = useFetch<Model[]>(`/repos/${router.query.id}/models`);

  function handleChooseFiles() {
    fileInputRef.current.click();
  }

  function handleOpenEditPanel(modelId: string) {
    setEditModelId(modelId);
  }

  function handleCloseEditPanel() {
    setEditModelId(undefined);
    mutate(models, true);
  }

  useEffect(() => {
    function handleEvent(event: Event) {
      const inputElement = event.target as HTMLInputElement

      if (inputElement.files) {
        setFile(inputElement.files[0]);
      }
    }

    fileInputRef.current?.addEventListener('change', handleEvent);

    return () => {
      fileInputRef.current?.removeEventListener('change', handleEvent);
    }
  }, [fileInputRef.current]);

  const {data: repo} = useFetch<Repo>(`/repos/${router.query.id}`);

  const userHasPermissionToEdit = !sessionLoading && (session.user.email === repo?.owner?.email || repo?.members.some(member => member.email === session.user.email));

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.containerOptions}>

          <Button onClick={handleChooseFiles} disabled={!userHasPermissionToEdit}>
            <input ref={fileInputRef} className={styles.invisibleInput} type="file" />

            <MdFileUpload />
            <span>Enviar Modelo</span>
          </Button>

          <Link href={userHasPermissionToEdit ? `/repos/${router.query.id}/settings` : `/repos/${router.query.id}`}>
            <a>
              <Button disabled={!userHasPermissionToEdit}>
                <GoGear />
              </Button>
            </a>
          </Link>
        </div>

          <table className={styles.tableModels}>
            <thead>
              <th>
                <button type="button" className={styles.columnName}>Nome</button>
              </th>
              <th>
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
            </thead>

            <tbody>
              {models?.map(model => (
                <tr key={model.id} className={styles.modelData}>
                  <td className={styles.labelInfoName}>
                    <span>{model.name}</span>
                  </td>
                  <td className={styles.labelInfo}>
                    <span>{model.version}</span>
                  </td>
                  <td className={styles.labelInfo}>
                    <span>{model.type}</span>
                  </td>
                  <td className={styles.labelInfo}>
                    <span>{model.metrics}</span>
                  </td>
                  <td className={styles.labelInfo}>
                    <span>{model.frameworks}</span>
                  </td>
                  <td>
                    <button type="button" className={styles.buttonDotDotDot} onClick={() => handleOpenEditPanel(model.id)}>
                      <BsThreeDotsVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </main>

      <CreateModalModal file={file} setFile={setFile} allowCreate={userHasPermissionToEdit} />

      <EditModalModal modelId={editModelId} onClose={handleCloseEditPanel} allowEdit={userHasPermissionToEdit} />
    </div>
  );
}

export default ViewRepo;
