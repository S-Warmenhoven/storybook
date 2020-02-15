// Below we build out Task’s three test states in the story file:

import React from 'react';
import { action } from '@storybook/addon-actions';

import Task from './Task';

export default {
  component: Task,
  title: 'Task',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// component -- the component itself,
// title -- how to refer to the component in 
//     the sidebar of the Storybook app,
// excludeStories -- exports in the story file 
//     that should not be rendered as stories by Storybook.

export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

export const Default = () => {
  return <Task task={{ ...taskData }} {...actionsData} />;
};

// action() allows us to create a callback that appears 
// in the actions panel of the Storybook UI when clicked. 
// So when we build a pin button, we’ll be able to determine 
// in the test UI if a button click is successful.

// As we need to pass the same set of actions to all permutations 
// of our component, it is convenient to bundle them up into a 
// single actionsData variable and use React's {...actionsData} 
// props expansion to pass them all at once. <Task {...actionsData}> 
// is equivalent to <Task onPinTask={actionsData.onPinTask} 
// onArchiveTask={actionsData.onArchiveTask}>.



export const Pinned = () => <Task task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />;

export const Archived = () => (
  <Task task={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />
);