import Dashboard from '@/components/dashboard';
import Orders from '@/components/orders';
import withAuth from '@/hocs/with-hocs';
import { DataContext } from '../../../context/data';
import { useContext } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let token;
  if (session) {
    token = session.idToken || session.user.token;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const orders = await res.json();
  return { props: { orders } };
}

const OrdersPage = ({ orders }) => {
  const { addOrders } = useContext(DataContext);
  addOrders(orders);

  return <Dashboard Content={Orders} />;
};

const WithAuthOrdersPage = withAuth(OrdersPage);
export default WithAuthOrdersPage;
