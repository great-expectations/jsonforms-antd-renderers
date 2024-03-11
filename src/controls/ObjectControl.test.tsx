import { test, expect, describe } from "vitest";
import {
  objectSchema,
  objectUISchemaWithName,
  objectUISchemaWithRule,
} from "../testSchemas/objectSchema";
import { render } from "../common/test-render";
import { screen } from "@testing-library/react";

describe("ObjectControl", () => {
  test("renders nested fields", () => {
    render({ schema: objectSchema });

    screen.getByText("Name");
    screen.getByText("Last Name");
  });

  describe("only renders when visible", () => {
    test("property is not visible if not included in UISchema", () => {
      render({ schema: objectSchema, uischema: objectUISchemaWithName });

      expect(screen.queryByText("Last Name")).toBeNull();
    });

    describe("manage visibility with condition rules", () => {
      test("hide field when condition matches", () => {
        render({
          data: { name: "John", lastName: "Doe" },
          schema: objectSchema,
          uischema: objectUISchemaWithRule,
        });

        expect(screen.queryByText("Last Name")).toBeNull();
      });

      test("render field when condition doesn't match", () => {
        render({
          data: { name: "Bob", lastName: "Doe" },
          schema: objectSchema,
          uischema: objectUISchemaWithRule,
        });

        screen.getByText("Name");
        screen.getByText("Last Name");
      });
    });
  });
});
