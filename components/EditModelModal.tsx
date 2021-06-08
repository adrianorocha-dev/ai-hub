import React, { useEffect, useState } from 'react';
import Modal from './Modal';

import styles from '../styles/pages/Repo.module.css';
import api from '../services/api';
import { useRouter } from 'next/router';
import Button from './Button';
import { MdClose, MdCloudDownload, MdDelete, MdSave } from 'react-icons/md';
import { Model } from '../@types/Model';

interface CreateModelModalProps {
  modelId: string | undefined;
  onClose: () => void;
}

const EditModalModal: React.FC<CreateModelModalProps> = ({ modelId, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const [metrics, setMetrics] = useState('');
  const [frameworks, setFrameworks] = useState('');

  const [fileUrl, setFileUrl] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!modelId) {
        return;
      }

      const response = await api.get<Model>(`/repos/${router.query.id}/models/${modelId}`);

      const model = response.data;

      setName(model.name);
      setDescription(model.description);
      setVersion(model.version);
      setType(model.type);
      setMetrics(model.metrics);
      setFrameworks(model.frameworks);

      setFileUrl(model.fileUrl);
    })();
  }, [modelId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.patch(`/repos/${router.query.id}/models/${modelId}`, {
      name,
      version,
      description,
      type,
      metrics,
      frameworks
    });

    onClose();
  }

  function handleDownload() {
    window.open(fileUrl, '_blank');
  }

  async function handleDelete() {
    const userConfirmed = confirm('Você tem certeza que deseja apagar esse repositório?');

    if (!userConfirmed) {
      return;
    }

    try {
      await api.delete(`/repos/${router.query.id}/models/${modelId}`);
    } catch(error) {
      alert('Erro ao excluir o modelo, tente novamente');
    }
  }

  return (
    <Modal open={Boolean(modelId)}>
      <header className={styles.modalHeader}>
        <h1>
          Editar modelo
        </h1>

        <div className={styles.modalHeaderButtonsContainer}>
          <Button
            className={`${styles.modalHeaderButton} ${styles.buttonDownload}`}
            title="Download do modelo"
            onClick={handleDownload}
          >
            <MdCloudDownload />
          </Button>

          <Button
            className={`${styles.modalHeaderButton} ${styles.buttonDelete}`}
            title="Excluir o modelo"
            onClick={handleDelete}
          >
            <MdDelete />
          </Button>
        </div>
      </header>

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
            onClick={onClose}
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

export default EditModalModal;