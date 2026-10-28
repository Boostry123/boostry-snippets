import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Button from "./simple-button";

const meta = {
  title: "Components/Simple Button",
  component: Button,
  tags: ["autodocs"],
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

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
