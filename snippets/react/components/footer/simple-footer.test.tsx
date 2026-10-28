//@vitest-environment jsdom
import { afterEach, describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import SimpleFooter from "./simple-footer";

afterEach(cleanup);

describe("SimpleFooter", () => {
  it("renders a single child as one column", () => {
    render(
      <SimpleFooter>
        <p>This is a footer item</p>
      </SimpleFooter>,
    );
    const footer = screen.getByRole("contentinfo");

    expect(footer.children).toHaveLength(1);
    expect(screen.getByText("This is a footer item")).toBeDefined();
  });
  it.each([
    { labels: ["A", "B"], columns: 2 },
    { labels: ["A", "B", "C"], columns: 3 },
  ])("renders $columns children as $columns columns", ({ labels, columns }) => {
    render(
      <SimpleFooter>
        {labels.map((label) => (
          <p key={label}>{label}</p>
        ))}
      </SimpleFooter>,
    );
    const footer = screen.getByRole("contentinfo");
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeDefined();
    });
    expect(footer.children).toHaveLength(columns);
  });
  it("renders with custom class names", () => {
    render(
      <SimpleFooter className="bg-gray-100" columnClassName="p-4">
        <p>This is a footer item</p>
      </SimpleFooter>,
    );
    const footer = screen.getByRole("contentinfo");

    expect(footer.className).toContain("bg-gray-100");
    expect(footer.children[0].className).toBe("p-4");
  });
  it("skips null and false children", () => {
    render(
      <SimpleFooter>
        {false}
        <p>A</p>
        {null}
        <p>B</p>
      </SimpleFooter>,
    );
    const footer = screen.getByRole("contentinfo");

    expect(footer.children).toHaveLength(2);
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });
  it("defaults classNames to empty strings", () => {
    render(
      <SimpleFooter>
        <p>This is a footer item</p>
      </SimpleFooter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer.children[0].className).toBe("");
    expect(footer.classList.contains("undefined")).toBe(false);
  });
});
