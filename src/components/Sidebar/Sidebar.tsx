import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo.tsx";
import AppNav from "../AppNav/AppNav.tsx";
import { Outlet } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet/>
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()}</p>
      </footer> 
    </div>
  );
}
