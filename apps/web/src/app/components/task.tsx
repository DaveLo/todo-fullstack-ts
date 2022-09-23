import type { TaskType } from "@todos/schemas/todos";

import { PinButton } from "./inputs/pin-button";

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
    task: { taskId, title, status },
    onArchiveTask,
  } = props;

  return (
    <article className={`list-item ${status}`}>
      <label
        htmlFor="checked"
        aria-label={`archiveTask-${taskId}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${taskId}`}
          checked={status === "TASK_ARCHIVED"}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(taskId)}
        />
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

      {status !== "TASK_ARCHIVED" && <PinButton id={taskId} />}
    </article>
  );
}

export default Task;
