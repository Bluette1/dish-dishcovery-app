import { useSession, signIn } from "next-auth/react";
import { ComponentType } from "react";

interface WithAuthProps {
  role?: string;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  role?: string
) => {
  const AuthHOC = (props: P & WithAuthProps) => {
    const { status, data: session } = useSession({
      required: true,
      onUnauthenticated() {
        signIn();
      },
    });

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (role && session?.user?.user?.role !== role) {
      return (
        <section className="h-screen flex justify-center">
          Access denied: Admin login required!
        </section>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthHOC;
};

export default withAuth;
