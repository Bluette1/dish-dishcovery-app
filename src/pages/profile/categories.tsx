import Dashboard from "../../components/dashboard";
import AddCategoryButton from "../../components/addcategorybutton";
import withAuth from "@/hocs/with-hocs";

const CategoriesPage: React.FC = () => {
  return <Dashboard Content={AddCategoryButton} />;
};

export default withAuth(CategoriesPage, "admin");
