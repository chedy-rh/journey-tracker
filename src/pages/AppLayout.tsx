import Sidebar from "../components/Sidebar/Sidebar.tsx";
import styles from "./AppLayout.module.css";
import Map from "../components/Map/Map.tsx";
import User from "../components/User/User.tsx";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User/>
    </div>
  );
}
