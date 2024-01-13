import { Button, Modal, Input, Form, Divider, Row, Col, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const ModalRole = (props) => {
    const { show, setShow } = props
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    }

    const showCloseConfirmation = () => {
        modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to close the modal?',
            onOk() {
                setShow(false);
                form.resetFields();
            }
        })
    };

    return (
        <Modal
            width={1000}
            title={<Typography.Title level={4}>Add roles</Typography.Title>}
            centered={true}
            closeIcon={false}
            open={show}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={showCloseConfirmation}
            destroyOnClose={true}
        >
            {contextHolder}
            <Divider />
            <Form
                form={form}
                name="dynamic_form_nest_item"
                size='large'
                onFinish={onFinish}
                autoComplete="off"

            >
                <Form.List name="roles">
                    {
                        (fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row
                                        gutter={16}
                                        key={key}
                                        style={
                                            {
                                                marginBottom: '8px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }
                                        }
                                    >
                                        <Col span={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing name',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Name" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={15}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing description',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Description" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1}>
                                            <MinusCircleOutlined style={{
                                                fontSize: '20px',
                                                marginBottom: '24px'
                                            }} onClick={() => remove(name)} />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default ModalRole;