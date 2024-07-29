import styles from "../../styles/loader.module.css";

function Loader() {
  return (
    <>
      <div className={styles.loader_container}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
}

export default Loader;
