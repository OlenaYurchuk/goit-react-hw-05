import css from '../Button/Button.module.css'

export default function Button({ children, onClick, disabled }) {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}