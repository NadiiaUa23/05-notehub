import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikError,
  // type FormikValues,
} from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import {
  type FormValues,
  type NoteFormProps,
  type NoteTag,
} from "../../types/note";
import { createNote } from "../../services/noteService";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object({
  title: Yup.string().min(3, "Min 3").max(50, "Max 50").required("Required"),
  content: Yup.string().max(500, "Max 500"),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS, "Invalid tag").required("Required"),
});

export default function NoteForm({ onCancel, onCreated }: NoteFormProps) {
  const initialValues: FormValues = { title: "", content: "", tag: "Todo" };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        try {
          await createNote({
            title: values.title,
            content: values.content,
            tag: values.tag as NoteTag,
          });
          onCreated();
        } catch (e) {
          console.error(e);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            {/* @ts-expect-error non-standard attribute required by task */}
            <span name="title" className={css.error}>
              <FormikError name="title" />
            </span>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            {/* @ts-expect-error non-standard attribute required by task */}
            <span name="content" className={css.error}>
              <FormikError name="content" />
            </span>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            {/* @ts-expect-error non-standard attribute required by task */}
            <span name="tag" className={css.error}>
              <FormikError name="tag" />
            </span>
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || !isValid}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
