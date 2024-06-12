import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { SidebarProps } from '../../interfaces/sidebar';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <Sider collapsible collapsed={!isOpen} onCollapse={toggleSidebar} className="sidebar">
            <Menu mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<AppstoreOutlined />}>
                    <Link to="recipes">Recipes</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<MailOutlined />}>
                    <Link to="add">Add Recipes</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
