import Dashboard from "../../components/dashboard";
import Content from "@/components/user";
import withAuth from "@/hocs/with-hocs";

const ProfilePage: React.FC = () => {
  return <Dashboard Content={Content} />;
};

export default withAuth(ProfilePage);
