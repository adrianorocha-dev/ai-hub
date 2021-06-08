import React, { ButtonHTMLAttributes } from 'react';

import styles from '../styles/components/Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...otherButtonProps }) => {
  return (
    <button className={`${styles.button} ${className ?? ''}`} {...otherButtonProps}>
      {children}
    </button>
  );
}

export default Button;
