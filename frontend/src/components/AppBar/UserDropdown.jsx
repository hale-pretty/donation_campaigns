import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { getFirstCharacter, showNotify } from '~/utils/helper';
import { menuItems } from '../dummy';

const UserDropdown = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMenuClick = ({ key }) => {
        setVisible(false);
        switch (key) {
            case 'profile':
            case 'campaigns':
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
            {menuItems.slice(0, -1).map(item => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item key="logout">{menuItems[menuItems.length - 1].label}</Menu.Item>
        </Menu>
    );

    return (
        <div>
            {isMobile ? (
                <div style={{ justifyItems: 'center'}}>
                    <div className="logger" style={{ marginBottom: '8px' }}>
                        {user.username}
                        <Avatar style={{ marginLeft: '10px' }} size="large">
                            {getFirstCharacter(user.username)}
                        </Avatar>
                    </div>
                {menuItems.map(item => (
                    <div className='p-3'
                        key={item.key} 
                        onClick={() => handleMenuClick(item.key)}
                    >
                        {item.label}
                    </div>
                ))}
                </div>
            ) : (
                <Dropdown 
                    overlay={menu} 
                    trigger={['click']} 
                    visible={visible}
                    onVisibleChange={(flag) => setVisible(flag)}
                >
                    <div className="logger" style={{ cursor: 'pointer' }}>
                        {user.username}
                        <Avatar 
                            style={{ verticalAlign: 'middle', marginLeft: '8px' }} 
                            size="large"
                            src={user?.avatarUrl}
                        >
                            {getFirstCharacter(user.username)}
                        </Avatar>
                    </div>
                </Dropdown>
            )}
        </div>
    );
};

export default UserDropdown;
