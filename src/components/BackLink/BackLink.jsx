// import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import css from './BackLink.module.css';

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={css.link}>
      {/* <HiArrowLeft size="24" /> */}
      <Button className={css.button} type="button">Go back</Button>
      {children}
    </Link>
  );
};
