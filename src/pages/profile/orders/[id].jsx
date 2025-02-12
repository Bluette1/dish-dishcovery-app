import Dashboard from '@/components/dashboard';
import Order from '@/components/order';
import withAuth from '@/hocs/with-hocs';

const OrderPage = () => {
  return <Dashboard Content={Order} />;
};

const WithAuthOrderPage = withAuth(OrderPage);
export default WithAuthOrderPage;
