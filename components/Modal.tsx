import React from 'react';

import styles from '../styles/components/Modal.module.css'

interface ModalProps {
  contentContainerClass?: string;
  open?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, contentContainerClass, open }) => {
  return (
    <div className={styles.container} style={{ display: !open && 'none' }}>
      <div className={`${styles.modalContent} ${contentContainerClass ?? ''}`}>
        { children }
      </div>
    </div>
  );
}

export default Modal;