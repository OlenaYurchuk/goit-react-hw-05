import Navigation from "../Navigation/Navigation";
import css from "../Layout/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <header className={css.header}>
        <Navigation />
      </header>
      {children}
    </div>
  )
}