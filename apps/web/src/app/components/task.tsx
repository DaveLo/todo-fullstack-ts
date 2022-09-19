import type { TaskType } from "@todos/schemas/todos";

export interface TaskProps {
  task: TaskType;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

/**
 * UI component for a single task
 * @param props individual task props
 * @returns single task row
 */
export function Task(props: TaskProps) {
  const {
    task: { id, title, state },
    onArchiveTask,
    onPinTask,
  } = props;

  return (
    <article className={`list-item ${state}`}>
      <label
        htmlFor="checked"
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <label className="title" htmlFor="title" aria-label={title}>
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input Task"
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          onClick={() => onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          key={`pinTask-${id}`}
        >
          <span className="icon-star" />
        </button>
      )}
    </article>
  );
}

export default Task;
