import React from "react"
import { Form, Input, Button, Space, Card } from "antd"
import type { Meta, StoryObj } from "@storybook/react"

const FormListSandbox = () => {
  const [form] = Form.useForm()

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Form.List Sandbox</h1>
      <p>
        Test AntD Form.List behavior with add/delete functionality. Fill in
        three items, then delete the middle one.
      </p>

      <Form form={form} layout="vertical">
        <Form.List name="items" initialValue={["", "", ""]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    name={name}
                    key={name}
                    // {...field}
                    label={`Item ${index + 1}`}
                    style={{ marginBottom: 0, flex: 1 }}
                  >
                    <Input placeholder={`Enter item ${index + 1}`} />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button onClick={() => remove(name)}>Delete</Button>
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                console.log("Current form values:", form.getFieldsValue())
                alert(JSON.stringify(form.getFieldsValue(), null, 2))
              }}
            >
              Show Values
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Card title="Instructions" size="small" style={{ marginTop: 20 }}>
        <ol>
          <li>
            Fill in the three inputs with distinct values (e.g., "first",
            "second", "third")
          </li>
          <li>Click the middle "Delete" button</li>
          <li>Click "Show Values" to see what's left</li>
          <li>Expected: ["first", "third"]</li>
          <li>Check the browser console for logs</li>
        </ol>
      </Card>
    </div>
  )
}

const meta: Meta<typeof FormListSandbox> = {
  title: "Sandbox/FormList",
  component: FormListSandbox,
}

export default meta

type Story = StoryObj<typeof FormListSandbox>

export const Default: Story = {}
