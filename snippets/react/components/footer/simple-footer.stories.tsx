import type { Meta, StoryObj } from "@storybook/react-vite";
import SimpleFooter from "./simple-footer";

const meta = {
  title: "Components/Simple Footer",
  component: SimpleFooter,
  tags: ["autodocs"],
  args: {
    className: "",
    columnClassName: "flex justify-center border",
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof SimpleFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleColumn: Story = {
  args: {
    children: (
      <div>
        <ul>
          <li>This is a single column Item</li>
          <li>This is a single column Item</li>
        </ul>
      </div>
    ),
  },
};

/** The columns are dynamic, each item provided in the children array will create a new column defaulting to no styling
 * Currently applied styling : flex justify-center border
 */
export const TwoColumns: Story = {
  args: {
    children: [
      <div>
        <ul>
          <li>This is a two columns Item</li>
          <li>This is a two columns Item</li>
        </ul>
      </div>,
      <div>
        <ul>
          <li>This is a two columns Item</li>
          <li>This is a two columns Item</li>
        </ul>
      </div>,
    ],
  },
};
export const ThreeColumns: Story = {
  args: {
    className: "bg-orange-100 text-sm px-5 gap-5 py-10 border-t",
    columnClassName: "flex justify-center",
    children: [
      <div>
        <ul>
          <li>This is a three columns Item</li>
          <li>This is a three columns Item</li>
          <li>This is a three columns Item</li>
        </ul>
      </div>,
      <div>
        <ul>
          <li>This is a three columns Item</li>
          <li>This is a three columns Item</li>
          <li>This is a three columns Item</li>
        </ul>
      </div>,
      <div>
        <ul>
          <li>This is a three columns Item</li>
          <li>This is a three columns Item</li>
          <li>This is a three columns Item</li>
        </ul>
      </div>,
    ],
  },
};
