import styles from "./AppNav.module.css";
import {NavLink} from "react-router-dom";
interface NavLink {
  path: string;
  label: string;
}

const NavLinks: NavLink[] = [
  {
    path: "cities",
    label: "Cities",
  },{
    path: "countries",
    label: "Countries",
  }
]
export default function AppNav() {
  return <div className={styles.nav}>
    <ul>
      {NavLinks.map(({ path, label }) => (
        <li key={path}>
          <NavLink to={path}>{label}</NavLink>
        </li>
      ))}
    </ul>
  </div>;
}
