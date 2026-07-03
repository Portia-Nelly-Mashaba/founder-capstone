import layout from "../components/layout/AppLayout.module.css";

export function AuthPage() {
  return (
    <div className={layout.page}>
      <h1 className={layout.pageTitle}>Sign in</h1>
      <p className={layout.pageLead}>
        Create an account or sign in to complete a booking. Browsing stays open to everyone.
      </p>
      <div className={layout.placeholder}>Auth form coming next.</div>
    </div>
  );
}
