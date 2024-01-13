import { Layout, Button, Row, Col, Typography, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { LuSunMedium } from "react-icons/lu";
import { CiDark } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../../redux/slices/themeSlice';
import { useEffect } from 'react';

const { Header } = Layout;

const AdminHeader = (props) => {
    const { collapsed, setCollapsed } = props
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

    const items = [
        {
            label: 'Profile',
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: '1',
        }
    ];

    return (
        <Header
            style={{
                padding: '0 24px',
            }}
        >
            <Row align="middle">
                <Col span={2}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: '64px',
                            height: '64px',
                            marginLeft: '-24px'
                        }}
                    />
                </Col>
                <Col span={8} offset={14}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={isDarkMode ? <LuSunMedium /> : <CiDark />}
                        onClick={() => dispatch(toggleDarkMode())}
                        style={{
                            fontSize: '24px',
                            width: '64px',
                            height: '64px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <Typography.Link>
                            <Space>
                                <Avatar src={<img src={url} alt="avatar" />} />
                                Ant design
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Col>
            </Row>



        </Header>
    )
}

export default AdminHeader