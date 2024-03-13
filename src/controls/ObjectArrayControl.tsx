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
import { ButtonProps } from "antd/lib";
import range from "lodash.range";
import React, { useCallback, useEffect, ComponentType } from "react";

interface ArrayControlButtons {
  AddButton?: ComponentType<ButtonProps>;
  RemoveButton?: ComponentType<ButtonProps>;
}

export function ObjectArrayControl({
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
  AddButton = Button,
  RemoveButton = Button,
}: ArrayControlProps & ArrayControlButtons) {
  const innerCreateDefaultValue = useCallback(
    () => createDefaultValue(schema, rootSchema),
    [schema, rootSchema],
  );

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
              <RemoveButton
                key="remove"
                disabled={!removeItems || (data === 1 && index === 0)}
                onClick={(e) => {
                  e.stopPropagation();
                  removeItems?.(path, [index])();
                }}
                children="Delete"
              />,
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
          <AddButton
            onClick={(e) => {
              e.stopPropagation();
              addItem(path, innerCreateDefaultValue())();
            }}
            children={`Add ${label}`}
          />
        </Flex>
      }
    />
  );
}
