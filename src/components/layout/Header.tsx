import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo} end>
          <span className={styles.logoMark} aria-hidden="true">
            BB
          </span>
          BorrowBlock
        </NavLink>

        <nav className={styles.nav} aria-label="Main">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            end
          >
            Browse
          </NavLink>
          <NavLink
            to="/auth"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Sign in
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
