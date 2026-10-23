import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Button from "./simple-button";

const meta = {
  title: "Buttons/Simple Button",
  component: Button,
  args: { onClick: fn() },
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const LongText: Story = {
  args: {
    children: "This is a button with a much longer label",
  },
};
