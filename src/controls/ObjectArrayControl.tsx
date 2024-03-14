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
import { ArrayControlOptions } from "../ui-schema";

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
}: ArrayControlProps) {
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

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {};

  const renderItem = (_item: number, index: number) => {
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
            key="remove"
            children="Delete"
            {...options.removeButtonProps}
            disabled={!removeItems || (data === 1 && index === 0)}
            onClick={(e) => {
              e.stopPropagation();
              removeItems?.(path, [index])();
            }}
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
  };

  const addButton = (
    <Flex justify="center">
      <Button
        children={`Add ${label}`}
        {...options.addButtonProps}
        onClick={(e) => {
          e.stopPropagation();
          addItem(path, innerCreateDefaultValue())();
        }}
      />
    </Flex>
  );

  return (
    <>
      <b>{label}</b>
      <List // there's a compelling case to be made for Form.List instead, but going with this for now
        dataSource={range(data)}
        renderItem={renderItem}
        {...(options.addButtonLocation === "top"
          ? { header: addButton }
          : { footer: addButton })}
      />
    </>
  );
}
