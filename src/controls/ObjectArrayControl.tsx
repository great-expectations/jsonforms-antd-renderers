/* eslint-disable @typescript-eslint/no-unused-vars */
import { Helpers } from "@jsonforms/core";
import {
  ArrayControlProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core";
import { JsonFormsDispatch } from "@jsonforms/react";
import { Flex, List, Button } from "antd";
import range from "lodash.range";
import React, { useCallback, useEffect } from "react";

export function ObjectArrayControl(props: ArrayControlProps) {
  const innerCreateDefaultValue = useCallback(
    () => createDefaultValue(props.schema, props.rootSchema),
    [props.schema, props.rootSchema],
  );
  const {
    enabled,
    data,
    path,
    schema,
    uischema,
    addItem,
    removeItems,
    renderers,
    cells,
    rootSchema,
    uischemas,
  } = props;

  useEffect(() => {
    if (data === 0) {
      addItem(path, innerCreateDefaultValue())();
    }
  }, [addItem, data, innerCreateDefaultValue, path]);

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema);
  const label = labelDescription.show ? labelDescription.text : "";
  return (
    <List // there's a compelling case to be made for Form.List instead, but going with this for now
      header={<b>{label}</b>}
      dataSource={range(data)}
      renderItem={(_item, index) => {
        const foundUISchema = findUISchema(
          uischemas ?? [],
          schema,
          uischema.scope,
          path,
          undefined,
          uischema,
          rootSchema,
        );
        return (
          <List.Item
            key={index}
            actions={[
              <Button
                key="delete"
                type="text"
                title="delete button"
                // ghost
                disabled={!removeItems || (data === 1 && index === 0)}
                onClick={(e) => {
                  e.stopPropagation();
                  removeItems?.(path, [index])();
                }}
              >
                Delete
              </Button>,
            ]}
          >
            <div style={{ width: "100%" }}>
              <JsonFormsDispatch
                enabled={enabled}
                schema={schema}
                path={composePaths(path, `${index}`)}
                uischema={foundUISchema}
                renderers={renderers}
                cells={cells}
                uischemas={uischemas}
              />
            </div>
          </List.Item>
        );
      }}
      footer={
        <Flex justify="center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addItem(path, innerCreateDefaultValue())();
            }}
          >
            Add {label}
          </Button>
        </Flex>
      }
    />
  );
}
