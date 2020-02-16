// Below we build out Task’s three test states in the story file:

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Task from './Task';

export default {
  component: Task,
  title: 'Task',
  decorators: [withKnobs],
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

// export const Default = () => {
//   return <Task task={{ ...taskData }} {...actionsData} />;
// };

export const Default = () => {
    return <Task task={object('task', { ...taskData })} {...actionsData} />;
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

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = () => (
  <Task task={{ ...taskData, title: longTitleString }} {...actionsData} />
);