import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/dashboard";
import Content from "@/components/user";
import { NextComponentType } from "next";

const ProfilePage: NextComponentType = () => {
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
  if (!session) {
    return null;
  }


  return session ? <Dashboard user={session.user} Content={Content} /> : null;
};

export default ProfilePage;

ProfilePage.auth = true;
