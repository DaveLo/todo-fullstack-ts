import type { TaskType } from "@todos/schemas/todos";

import { getTasks, updateArchiveTask } from "../api/tasks";
import Task from "./task";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

/** Low level wrapper component for list */
const Container = ({ children }: { children: ReactNode }) => (
  <section className="list-items">{children}</section>
);

/**
 * Abstract low level filler row for page loading state
 * @returns loading row template
 */
const LoadingRow = () => (
  <article className="loading-item">
    <span className="glow-checkbox" />
    <span className="glow-text">
      <span>Loading</span> <span>cool</span> <span>state</span>
    </span>
  </article>
);

export interface TaskListProps {
  loading: boolean;
  tasks: TaskType[];
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

/**
 * UI component for task list
 * @param props task list data
 * @returns presentational component
 */
export function TaskList(props: TaskListProps) {
  const { loading, tasks, ...events } = props;

  if (loading) {
    return (
      <Container>
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </Container>
    );
  } else if (tasks.length === 0) {
    return (
      <Container>
        <article className="list-items" key={"empty"} data-testid="empty">
          <div className="wrapper-message">
            <span className="icon-check" />
            <p className="title-message">You have no tasks</p>
            <p className="subtitle-message">Sit back and relax</p>
          </div>
        </article>
      </Container>
    );
  }

  const orderedTasks = [
    ...tasks.filter(({ state }) => state === "TASK_PINNED"),
    ...tasks.filter(({ state }) => state !== "TASK_PINNED"),
  ];

  return (
    <Container>
      {orderedTasks.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </Container>
  );
}

/**
 * Manage state/querying backend task data
 * @returns Connected task list
 */
export default function () {
  const client = useQueryClient();
  const { isLoading, isSuccess, data } = useQuery(["tasks", "list"], getTasks);

  const archive = useMutation((task: TaskType) => updateArchiveTask(task), {
    onSuccess: (updatedTask) => {},
  });
  const pinTask = (id: string) => {};
  const archiveTask = (taskId: string) => {
    if (data) {
      const task = data.find(({ id }) => id === taskId);
      if (!task) {
        return;
      }
    }
  };

  return (
    <TaskList
      loading={isLoading}
      tasks={isSuccess ? data : []}
      onArchiveTask={archiveTask}
      onPinTask={pinTask}
    />
  );
}
