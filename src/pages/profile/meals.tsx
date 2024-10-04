import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/dashboard";
import AddMeal from "../../components/addmeal"; 
import { NextComponentType } from "next";

const MealsPage: NextComponentType = () => {
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
    <Dashboard user={session.user} Content={AddMeal} />
  ) : null;
};

export default MealsPage;
MealsPage.adminAuth = true;
