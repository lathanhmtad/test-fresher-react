import { Button, Modal, Input, Form, Divider, Row, Col, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { createRoles } from '../../../redux/slices/roles/roleThunk';
import { useEffect } from 'react';
import { resetIsCreateRolesSuccess } from '../../../redux/slices/roles/roleSlice';

const ModalRole = (props) => {
    const { loading, isCreateRolesSuccess } = useSelector(state => state.role)
    const { show, setShow } = props
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDispatch()

    useEffect(() => {
        if (isCreateRolesSuccess) {
            toast.success('Create roles success!')
            setShow(false)
            form.resetFields()
            dispatch(resetIsCreateRolesSuccess())
        }
    }, [isCreateRolesSuccess])

    const onFinish = (values) => {
        if (_.isUndefined(values.roles) || _.isEmpty(values.roles)) {
            toast.error('Please add fields for data entry!')
        }
        else {
            modal.confirm({
                title: 'Confirm creation',
                content: 'Are you sure create?',
                onOk: () => {
                    dispatch(createRoles(values))
                }
            })
        }
    }

    const showCloseConfirmation = () => {
        modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to close the modal?',
            onOk() {
                toast.dismiss()
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
                                    <Button type="dashed" onClick={() => {
                                        toast.dismiss()
                                        add()
                                    }} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
                <Form.Item>
                    <Button
                        loading={loading ? true : false}
                        type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default ModalRole;