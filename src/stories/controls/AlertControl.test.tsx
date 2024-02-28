import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../common/test-render";
import { JSONSchema } from "json-schema-to-ts";


const schema = {
  type: "object",
  properties: { 
    text: { type: "string" }, 
    options: {
      type: "object", 
      properties: {
        type: {
          type: "string"
        }
      }
    }
  }
} satisfies JSONSchema;

test("defaults to info", async () => {
  render({
    schema: schema,
    uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Label",
            text: "An African swallow, maybe -- but not a European swallow, that's my point.",
            options: {}
          }
        ],
      },
  });
  const input = await screen.findByRole("alert");
  expect(input).toHaveClass("ant-alert-info");
});


test.each([
  ["info", "ant-alert-info"],
  ["warning", "ant-alert-warning"],
  ["success", "ant-alert-success"]
])("label option type sets antd class", async (optionType: string, className: string) => {
  render({
    schema: schema,
    uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Label",
            text: "African swallows are non-migratory.",
            options: { type: optionType }
          }
        ],
      },
  });
  const input = await screen.findByRole("alert");
  expect(input).toHaveClass(className);
});