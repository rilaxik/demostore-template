import s from './style.module.scss';
import { useParams } from 'react-router-dom';

const CheckoutFinalPage = () => {
  const params = useParams();

  console.log(params.cartId);
  return <div></div>;
};

export default CheckoutFinalPage;
