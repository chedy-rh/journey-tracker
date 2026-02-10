import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return <Link to="/" className={styles.logoLink} >
    <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
    <h3 >My Journey Tracker</h3>
  </Link>;
}

export default Logo;
