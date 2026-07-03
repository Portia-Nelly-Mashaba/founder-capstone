import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import styles from "./Header.module.css";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true">
            BB
          </span>
          BorrowBlock
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <Link to="/" className={styles.navLink}>
            Browse
          </Link>
          {user ? (
            <>
              <span className={styles.userGreeting}>Hi, {user.displayName.split(" ")[0]}</span>
              <button type="button" className={styles.logoutButton} onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <Link to="/auth" className={styles.navLink}>
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
