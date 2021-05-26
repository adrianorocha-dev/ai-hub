import React from 'react';

import styles from '../styles/components/Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick, disabled = false }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
