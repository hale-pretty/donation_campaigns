import { useState } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { showNotify } from '~/utils/helper';

const UserDropdown = ({ user }) => {
    const [visible, setVisible] = useState(false);

    const handleMenuClick = ({ key }) => {
        setVisible(false);
           
        switch (key) {
            case 'profile':
                window.location.href = '/profile';
                break;
            case 'campaigns':
                window.location.href = '/profile';
                break;
            case 'contributions':
                window.location.href = '/profile';
                break;
            case 'settings':
                window.location.hash = 'settings';
                break;
            case 'edit_profile':
                window.location.pathname = '/profile'; 
                window.location.hash = 'edit_profile'; 
                break;
            case 'logout':
                showNotify('Success', 'User logged out successfully!');
                window.location.href = "/";
                localStorage.removeItem("token");
                break;
            default:
                break;
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="campaigns">My Campaigns</Menu.Item>
            <Menu.Item key="contributions">My Contributions</Menu.Item>
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="edit_profile">Edit Profile</Menu.Item>
            <Menu.Item key="settings">Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">Log Out</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown 
            overlay={menu} 
            trigger={['click']} 
            visible={visible}
            onVisibleChange={(flag) => setVisible(flag)}
        >
            <div className="logger" style={{ cursor: 'pointer' }}>
                {`${user.firstName} ${user.lastName}`}
                <Avatar 
                    style={{ verticalAlign: 'middle', marginLeft: '8px' }} 
                    size="large"
                >
                    {user.firstName.charAt(0)}
                </Avatar>
            </div>
        </Dropdown>
    );
};

export default UserDropdown;