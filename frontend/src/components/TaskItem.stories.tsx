import type { Meta, StoryObj } from '@storybook/react-vite';
import { TaskItem } from './TaskItem';
import { action } from 'storybook/actions';

const meta: Meta<typeof TaskItem> = {
  title: 'Components/TaskItem',
  component: TaskItem,
  args: {
    onChange: action('CHANGE'),
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TaskItem>;

export const NotStarted: Story = {
  args: {
    task: {
      id: '1',
      title: 'Incomplete Task',
      status: 'notStarted',
    },
  },
};

export const Completed: Story = {
  args: {
    task: {
      id: '2',
      title: 'Completed Task',
      status: 'completed',
    },
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      id: '3',
      title: 'This is a very long task title test',
      status: 'notStarted',
    },
  },
};
