import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateTaskForm } from './CreateTaskForm';
import { action } from 'storybook/actions';

const meta: Meta<typeof CreateTaskForm> = {
  title: 'Components/CreateTaskForm',
  component: CreateTaskForm,
  args: {
    onSubmit: action('SUBMIT'),
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CreateTaskForm>;

export const Index: Story = {};
