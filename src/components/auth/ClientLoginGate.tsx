import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Logo } from "@/components/landing/Logo";

const STORAGE_KEY = "client_login_authed";
const ACCESS_PASSWORD = "oracle2026";

type Props = { children: ReactNode };

export const ClientLoginGate = ({ children }: Props) => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
    setChecked(true);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  if (!checked) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <Logo asLink={false} />
          <div className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-lg font-semibold text-foreground">Client Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your access password to continue.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-xs text-danger">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Unlock
          </button>
        </form>
        <Link
          to="/"
          className="mt-6 block text-center text-xs text-muted-foreground hover:text-foreground"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
};