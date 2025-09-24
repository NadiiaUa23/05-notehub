import css from "./EmptyState.module.css";

interface EmptyStateProps {
  onCreate: () => void;
}

export default function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className={css.empty}>
      <h2>No notes yet</h2>
      <p>Create your first note to get started.</p>
      <button className={css.button} onClick={onCreate}>
        Create note +
      </button>
    </div>
  );
}
