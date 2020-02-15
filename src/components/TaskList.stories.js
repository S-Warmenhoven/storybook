import React from 'react';

// import TaskList from './TaskList';
import { PureTaskList } from './TaskList';

import { taskData, actionsData } from './Task.stories';

export default {
    component: PureTaskList,
    title: 'TaskList',
    decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
    excludeStories: /.*Data$/,
};

// export default {
//   component: TaskList,
//   title: 'TaskList',
//   decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
//   excludeStories: /.*Data$/,
// };

// Decorators are a way to provide arbitrary wrappers to 
// stories. In this case we’re using a decorator `key` on 
// the default export to add some `padding` around the 
// rendered component. They can also be used to wrap stories 
// in “providers” –i.e. library components that set React context.

export const defaultTasksData = [
  { ...taskData, id: '1', title: 'Task 1' },
  { ...taskData, id: '2', title: 'Task 2' },
  { ...taskData, id: '3', title: 'Task 3' },
  { ...taskData, id: '4', title: 'Task 4' },
  { ...taskData, id: '5', title: 'Task 5' },
  { ...taskData, id: '6', title: 'Task 6' },
];

export const withPinnedTasksData = [
  ...defaultTasksData.slice(0, 5),
  { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
];

export const Default = () => <PureTaskList tasks={defaultTasksData} {...actionsData} />;

export const WithPinnedTasks = () => <PureTaskList tasks={withPinnedTasksData} {...actionsData} />;

export const Loading = () => <PureTaskList loading tasks={[]} {...actionsData} />;

export const Empty = () => <PureTaskList tasks={[]} {...actionsData} />;

// export const Default = () => <TaskList tasks={defaultTasksData} {...actionsData} />;
// export const WithPinnedTasks = () => <TaskList tasks={withPinnedTasksData} {...actionsData} />;
// export const Loading = () => <TaskList loading tasks={[]} {...actionsData} />;
// export const Empty = () => <TaskList tasks={[]} {...actionsData} />;