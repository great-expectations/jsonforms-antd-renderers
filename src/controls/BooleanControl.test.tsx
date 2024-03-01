import { test, expect} from "vitest";
import { render } from "../common/test-render";
import {screen} from "@testing-library/react";

test("renders the Checkbox component", async () => {
  render(
    {
      schema: {
        type: "object",
        properties: { adult: { type: "boolean", title: "Adult"} },
      },
    }
  );

    const checkbox = await screen.findByLabelText("Adult");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeEnabled();
    // check that there is an checkbox
    expect(checkbox.tagName).toBe("INPUT");
    expect(checkbox.getAttribute("type")).toBe("checkbox");

});
