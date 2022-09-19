import Task, { type TaskProps } from "./task";
import type { Meta, Story } from "@storybook/react";

export default {
  component: Task,
  title: "Task",
} as Meta<TaskProps>;

const Template: Story<TaskProps> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test",
    state: "TASK_INBOX",
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    id: "1",
    title: "Test",
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    id: "1",
    title: "Test",
    state: "TASK_ARCHIVED",
  },
};
