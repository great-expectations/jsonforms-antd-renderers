import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { render } from "../common/test-render";

test("renders Checkbox component with default label", async () => {
  render({
    schema: {
      type: "object",
      properties: { name: { type: "boolean", title: "Name" } },
    },
    data: { name: true },
  });

  const checkbox = await screen.findByLabelText("Name");
  expect(checkbox).toBeChecked();
});

test("handles onChange event correctly", async () => {
  let formData = { name: false };

  render({
    schema: {
      type: "object",
      properties: { name: { type: "boolean", title: "Name" } },
    },
    data: formData,
    onChange: (result) => {console.log(result); formData = result.data},
  });

  const checkbox = await screen.findByLabelText("Name");
  expect(checkbox).not.toBeChecked();

  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  console.log(formData);
  expect(formData.name).toBe(true);

  await userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(formData.name).toBe(false);
});