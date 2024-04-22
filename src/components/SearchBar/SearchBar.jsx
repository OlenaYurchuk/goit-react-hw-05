import { Formik, Form, Field } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { FiSearch } from "react-icons/fi";
import css from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {
  return (
    <div>
      <Toaster />
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (!values.query.trim()) {
            toast.error("Please enter a search query!")
          } else {
            onSearch(values.query);
            actions.resetForm()
          }

        }}
      >
        <Form className={css.form}>
          <Field className={css.searchField}
            type="text"
            name="query"
            placeholder="search movies"
            autoComplete="off"
            autoFocus
          />
          <button className={css.btn} type="submit">
            <FiSearch size="16px" />
          </button>
        </Form>
      </Formik>
    </div>
  )
}