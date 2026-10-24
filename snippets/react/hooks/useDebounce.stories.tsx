import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDebounce } from "./useDebounce";

interface DebounceProps {
  /**
   * Timeout in ms
   */
  delay: number;
}

function DebounceDemo({ delay }: DebounceProps) {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, delay);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type fast..."
        className="border rounded px-3 py-2"
      />
      <p>Type: {text}</p>
      <p>Debounced: {debounced}</p>
    </div>
  );
}

const meta = {
  title: "Hooks/useDebounce",
  component: DebounceDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Returns `value` only after it has stopped changing for `delay` ms.",
      },
    },
  },
  args: { delay: 500 },
  argTypes: {
    delay: {
      description: "Timeout in ms",
      control: { type: "range", min: 0, max: 3000, step: 100 },
    },
  },
} satisfies Meta<typeof DebounceDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { delay: 500 },
};
