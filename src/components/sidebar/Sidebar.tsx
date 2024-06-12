import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    BookFilled,
    MailOutlined,
} from '@ant-design/icons';
import { SidebarProps } from '../../interfaces/sidebar';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <Sider collapsed={!isOpen} onCollapse={toggleSidebar} className="sidebar">
            <Menu mode="inline" className='menu'>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/" className='menu-link'>Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<BookFilled />}>
                    <Link to="recipes" className='menu-link'>Recipes</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<MailOutlined />}>
                    <Link to="add" className='menu-link'>Add Recipes</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
