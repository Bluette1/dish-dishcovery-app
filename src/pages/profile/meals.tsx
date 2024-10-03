import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/dashboard";
import AddMealForm from "../../components/addmealform"; // Import the button component

const MealsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }


  return session ? (
    <Dashboard user={session.user} Content={AddMealForm} />
  ) : null;
};

export default MealsPage;
