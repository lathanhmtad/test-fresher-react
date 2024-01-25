import { Button, Checkbox, Col, Divider, Flex, Row, Select, Space, Typography } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignPermissionsForRole, fetchAllRoles } from "../../../redux/slices/roles/roleThunk";
import { fetchPermissions } from "../../../redux/slices/permissionSlice";
import { toast } from "react-toastify";
import { resetIsAssignSuccess } from "../../../redux/slices/roles/roleSlice";
import roleService from "../../../services/roleService";

const PermissionPage = () => {
    const { roleOptions, loading, isAssignSuccess } = useSelector(state => state.role)
    const permissionOptions = useSelector(state => state.permission.options)

    const [selectedValue, setSelectedValue] = useState('')
    const [checkedValues, setCheckedValues] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllRoles())
        dispatch(fetchPermissions())
    }, [])

    useEffect(() => {
        if (isAssignSuccess) {
            toast.success('Assign success!')
            dispatch(resetIsAssignSuccess())
        }
    }, [isAssignSuccess])

    const handleChangeOptions = async (value) => {
        toast.dismiss()
        setSelectedValue(value)
        const res = await roleService.getPermission(value)
        setCheckedValues(res.map(item => item.id))
    }

    const handleChangeCheckbox = (checkedValues) => {
        console.log(checkedValues)
        setCheckedValues(checkedValues)
    }

    const handleSubmit = () => {
        if (!selectedValue) {
            toast.error('Please select roles')
            return
        }

        dispatch(assignPermissionsForRole({
            roleId: selectedValue,
            permissions: checkedValues
        }))
    }

    return (
        <div>
            <Space
                direction="vertical"
                size="small"
            >
                <Typography.Title style={{ marginBottom: 0 }} level={2}>Permissions</Typography.Title>
                <Typography.Title level={5}>Manage permissions for roles</Typography.Title>
            </Space>
            <Divider />
            <Flex vertical
                align="center"
            >
                <Select
                    loading={loading ? true : false}
                    size="large"
                    placeholder="Please select"
                    style={{
                        maxWidth: '500px',
                        width: '100%'
                    }}
                    onChange={handleChangeOptions}
                    options={roleOptions}
                />
            </Flex>

            <Divider orientation="left">Assign permissions</Divider>

            {selectedValue && <Checkbox.Group
                style={{
                    width: '100%',
                }}
                onChange={handleChangeCheckbox}
                value={checkedValues}
            >
                <Row
                    gutter={[16, 24]}
                    align="middle"
                >
                    {permissionOptions.map(item => (
                        <Col key={item.value}
                            span={6}>
                            <Checkbox
                                disabled={(!selectedValue || loading) ? true : false}
                                value={item.value}>{item.label}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>}

            <Flex align="center" justify="center">
                <Button
                    onClick={handleSubmit}
                    style={{
                        marginTop: '24px',

                    }}
                    type="primary">Save</Button>
            </Flex>
        </div>
    )
}

export default PermissionPage