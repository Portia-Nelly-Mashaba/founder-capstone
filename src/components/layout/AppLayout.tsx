import { Outlet } from "react-router-dom";
import { Header } from "./Header.tsx";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main} id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
