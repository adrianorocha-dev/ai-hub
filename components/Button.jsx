import React from 'react';

import styles from '../styles/components/Button.module.css';

function Button({ children, type, onClick }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={styles.button} type={type ?? 'button'} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
