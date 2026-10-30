import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import DynamicForm from "./dynamic-form";

const meta = {
  title: "Components/Dynamic Form",
  component: DynamicForm,
  tags: ["autodocs"],
  args: {
    buttonTitle: "Submit",
    onSubmit: fn((form) => {
      console.log(form);
    }),
    className: "max-w-xl border-gray-200 shadow-sm",
    labelClassName: "text-md font-medium",
    inputClassName: "border-gray-300 ",
    checkboxClassName: "",
  },
  argTypes: {
    buttonTitle: {
      control: "text",
    },
  },
} satisfies Meta<typeof DynamicForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignupForm: Story = {
  args: {
    forms: {
      Name: "text",
      Email: "email",
      Password: "password",
    },
  },
};
export const SignInForm: Story = {
  args: {
    forms: {
      Email: "email",
      Password: "password",
      "Remember me": "checkbox",
    },
  },
};

export const FormWithFile: Story = {
  args: {
    forms: {
      Email: "email",
      Password: "password",
      "Remember me": "checkbox",
      resume: "file",
    },
  },
};
