import React from 'react';

import styles from '../styles/components/Button.module.css';

interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, type = 'button', onClick, disabled = false }) => {
  return (
    <button className={`${styles.button} ${className ?? ''}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
