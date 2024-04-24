import css from "../ErrorMessage/ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.wrap}>
      <p>❌ Something went wrong</p>
    </div>
  )
}