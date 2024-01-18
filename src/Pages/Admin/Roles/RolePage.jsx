import { useState } from "react";
import { Button, Flex, Space, Typography, Divider } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
import ModalRole from "../../../Components/Admin/Roles/ModalRole";
import TableRole from "../../../Components/Admin/Roles/TableRole";

const RolePage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Flex align="center" justify="space-between">
                <Space
                    direction="vertical"
                    size="small"
                >
                    <Typography.Title style={{ marginBottom: 0 }} level={2}>Roles</Typography.Title>
                    <Typography.Title level={5}>Roles management</Typography.Title>
                </Space>
                <div>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setModalOpen(true)}
                        size="large">
                        Add roles
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableRole />

            <ModalRole
                show={modalOpen}
                setShow={setModalOpen}
            />
        </div>
    )
}

export default RolePage