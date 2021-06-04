import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdClose, MdFileUpload, MdSave } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

import styles from '../../../styles/pages/Repo.module.css';
import api from '../../../services/api';

function Repo() {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const [metrics, setMetrics] = useState('');
  const [frameworks, setFrameworks] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  function handleChooseFiles() {
    fileInputRef.current.click();
  }

  function clearForm() {
    setFile(undefined);
    setName('');
    setVersion('');
    setDescription('');
    setVersion('');
    setType('');
    setMetrics('');
    setFrameworks('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('version', version);
    formData.append('type', type);
    formData.append('metrics', metrics);
    formData.append('frameworks', frameworks);

    await api.post(`/repos/${router.query.id}/models`, formData);

    alert('Modelo cadastrado com sucesso');

    clearForm();
  }

  useEffect(() => {
    function handleEvent(event: Event) {
      setFile(event.target.files[0]);
    }

    fileInputRef.current.addEventListener('change', handleEvent);

    return () => {
      fileInputRef.current.removeEventListener('change', handleEvent);
    }
  }, [fileInputRef.current]);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.containerOptions}>

          <Button onClick={handleChooseFiles}>
            <input ref={fileInputRef} className={styles.invisibleInput} type="file" />

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

      <Modal open={Boolean(file)}>
        <form className={styles.modelInfoForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="model-name" className={styles.label}>
              Nome do modelo:
            </label>
            <input
              id="model-name"
              className={styles.input}
              type="text"
              placeholder="Digite o nome para o seu modelo"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="model-description" className={styles.label}>
              Descrição:
            </label>
            <input
              id="model-description"
              className={styles.input}
              type="text"
              placeholder="Faça uma breve descrição sobre o repositório"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="model-version" className={styles.label}>
              Versão:
            </label>
            <input
              id="model-version"
              className={styles.input}
              type="text"
              placeholder="Número da versão"
              value={version}
              onChange={event => setVersion(event.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="model-type" className={styles.label}>
              Tipo:
            </label>
            <input
              id="model-type"
              className={styles.input}
              type="text"
              placeholder="Tipo de modelo"
              value={type}
              onChange={event => setType(event.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="model-metrics" className={styles.label}>
              Métricas:
            </label>
            <input
              id="model-metrics"
              className={styles.input}
              type="text"
              placeholder="Digite as métricas"
              value={metrics}
              onChange={event => setMetrics(event.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="model-framework" className={styles.label}>
              Framework:
            </label>
            <input
              id="model-framework"
              className={styles.input}
              type="text"
              placeholder="Nome da framework ou ferramentas utilizadas"
              value={frameworks}
              onChange={event => setFrameworks(event.target.value)}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              className={`${styles.modalButton} ${styles.buttonCancel}`}
              type="button"
              onClick={clearForm}
              >
              <MdClose size={24} />
              <span>Cancelar</span>
            </Button>

            <Button
              className={`${styles.modalButton} ${styles.buttonSave}`}
              type="submit"
              >
              <MdSave size={24} />
              <span>Salvar</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Repo;
