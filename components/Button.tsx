import React from 'react';

import styles from '../styles/components/Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
