import React, { useState, FormEvent } from "react";
import styles from "../styles/auth.module.css";
import Meta from "@/components/meta";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@headlessui/react"; 

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <Meta
        title="Login | Dish Discovery"
        description="Login to your account."
        keywords="login, delicious, healthy, affordable, dish, discovery"
      />
      <main className={styles.container}>
        <h1 className="py-6">Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <Button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles.divider}>or</div>
        <section className="flex justify-center">
          <Button className={styles.googleButton} onClick={handleGoogleSignIn}>
            <Image
              src="/icons/google.png"
              alt="Google icon"
              width={24}
              height={24}
              className="mx-2"
            />
            Sign in with Google
          </Button>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
