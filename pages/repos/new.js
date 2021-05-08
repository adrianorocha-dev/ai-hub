import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button'

import styles from '../../styles/pages/NewRepo.module.css'

function NewRepo (){
    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>

                <form className={styles.form}>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nome do repositório:</label>
                        <input className={styles.input} type="text" placeholder="Digite o nome do seu reposiório"/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Descrição:</label>
                        <textarea className={styles.input} type="text" placeholder="Faça uma breve descrição sobre o repositório"/>
                    </div>

                    <div className={styles.inputGroup}>
                        <p className={styles.label}>Visibilidade:</p>

                        <div>
                            <input type="radio" value="publico" name="gender" />
                            <label className={styles.label}>Público</label>
                        </div>

                        <div>
                            <input type="radio" value="privado" name="gender" />
                            <label className={styles.label}>Privado</label>
                        </div>

                    </div>

                    <div className={styles.buttonContainer}>
                        <Button>
                            <span className={styles.buttonText}>Criar repositório</span>
                        </Button>
                    </div>

                </form>

                <img src="assets/undraw_Filing_system.svg" alt="Cadastrando repositório" />

            </main>
        </div>
    );
}

export default NewRepo;