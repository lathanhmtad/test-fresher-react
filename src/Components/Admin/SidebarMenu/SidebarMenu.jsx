import { Menu } from "antd"
import {
    DashboardOutlined,
} from '@ant-design/icons';
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarMenu = () => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const navigate = useNavigate()
    const location = useLocation()

    const items = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/admin')
        },
        {
            key: '/admin/roles',
            icon: <MdOutlineAdminPanelSettings />,
            label: 'Roles',
            onClick: () => navigate('/admin/roles')
        },
    ]


    return (
        <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={items}
        />
    )
}

export default SidebarMenu