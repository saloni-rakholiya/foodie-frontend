import styles from "./style.module.css";

const Loader = () => (
  <div className={styles.container}>
    <div className={styles.main}>
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
    </div>
    <br />
    <div className={styles.main}>Loading...</div>
  </div>
);

export default Loader;
