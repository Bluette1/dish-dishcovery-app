import Dashboard from "../../components/dashboard";
import AddCategoryButton from "../../components/addcategorybutton";
import withAuth from "@/hocs/with-hocs";

const CategoriesPage: React.FC = () => {
  return <Dashboard Content={AddCategoryButton} />;
};

const WithAuthCategoriesPage = withAuth(CategoriesPage, "admin");
export default WithAuthCategoriesPage;
