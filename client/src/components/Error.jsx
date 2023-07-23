import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes, getDiets, setError } from "../actions";
import { useHistory } from "react-router-dom";
import styles from "../styles/Error.module.css";

function Error() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [remainingSeconds, setRemainingSeconds] = useState(5);

  useEffect(() => {    
    const redirectTimeout = setTimeout(() => {
          dispatch(setError(false));
          dispatch(getRecipes());
          dispatch(getDiets());
          history.push("/home");
        }, remainingSeconds * 1000);

  return () => clearTimeout(redirectTimeout);
    }, [dispatch, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds > 0) {
      const interval = setInterval(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingSeconds]);

  return (
    <div>
        <h1 className={styles.title}>404Pagina Erronea</h1>
        <p className={styles.zoomArea}><b>Ops !</b> La pagina que buscas no existe. </p>
        {
          remainingSeconds > 0 && (
            <p className={styles.zoomArea}>
              <b>Ops!</b> Serás redirigido en {remainingSeconds} segundo
              {remainingSeconds !== 1 ? "s" : ""}.
            </p>
        )}
        <section className={styles.errorContainer}>
            <span className={styles.four}><span className={styles.screenReaderText}>4</span></span>
            <span className={styles.zero}><span className={styles.screenReaderText}>0</span></span>
            <span className={styles.four}><span className={styles.screenReaderText}>4</span></span>
        </section>
        </div>
    );
}

export default Error;