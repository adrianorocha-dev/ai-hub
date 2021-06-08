import React, { useState } from 'react';
import Modal from './Modal';

import styles from '../styles/pages/Repo.module.css';
import api from '../services/api';
import { useRouter } from 'next/router';
import Button from './Button';
import { MdClose, MdSave } from 'react-icons/md';

interface CreateModelModalProps {
  file: File | undefined;
  setFile: (file: File) => void;
}

const CreateModalModal: React.FC<CreateModelModalProps> = ({ file, setFile }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const [metrics, setMetrics] = useState('');
  const [frameworks, setFrameworks] = useState('');

  const router = useRouter();

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

  return (
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
  )
}

export default CreateModalModal;