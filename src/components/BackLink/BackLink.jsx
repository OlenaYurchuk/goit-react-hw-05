import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import css from './BackLink.module.css';

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={css.link}>
      <Button className={css.button} type="button">Go back</Button>
      {children}
    </Link>
  );
};
