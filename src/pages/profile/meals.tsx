import Dashboard from "../../components/dashboard";
import AddMeal from "../../components/addmeal";
import withAuth from "@/hocs/with-hocs";

const MealsPage: React.FC = () => {
  return <Dashboard Content={AddMeal} />;
};

export default withAuth(MealsPage, "admin");
