import { type FormEvent, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import layout from "../components/layout/AppLayout.module.css";
import { useAuth } from "../context/AuthContext.tsx";
import form from "../components/booking/bookingForm.module.css";
import styles from "./AuthPage.module.css";

function safeRedirect(path: string | null): string {
  if (path && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return "/";
}

export function AuthPage() {
  const { user, login } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedName = displayName.trim();

    if (!trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }

    login(trimmedEmail, trimmedName);
  }

  return (
    <div className={layout.page}>
      <div>
        <h1 className={layout.pageTitle}>Sign in to BorrowBlock</h1>
        <p className={layout.pageLead}>
          Browsing is open to everyone. Sign in only when you&apos;re ready to book — we&apos;ll
          need your details to connect you with the owner.
        </p>
      </div>

      <form className={`${form.card} ${styles.form}`} onSubmit={handleSubmit} noValidate>
        <div className={form.field}>
          <label className={form.label} htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            className={form.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="auth-name">
            Your name
          </label>
          <input
            id="auth-name"
            type="text"
            className={form.input}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        {error && (
          <p className={form.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={form.primaryButton}>
          Continue
        </button>
      </form>
    </div>
  );
}
