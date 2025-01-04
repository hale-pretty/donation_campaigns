import { Card, Typography, Button } from 'antd';
const { Title, Text } = Typography;

const SettingsTab = () => {
  const handleDeactivateAccount = () => {
    console.log('Account deactivated');
  };

  return (
    <Card>
      <Title level={4} style={{ marginTop: '24px' }}>Deactivate Your Account</Title>
      <Text>
        By deactivating your account, you will no longer be able to log in, manage any contributions, and will lose any draft campaigns. Please review our  
      </Text>
      <Button className='p-1' type='link'>Privacy Policy</Button>
      <Text>for more information.</Text>
      <div>
      <Button type='primary' style={{ marginTop: '16px' }} onClick={handleDeactivateAccount}>
        Deactivate Account
      </Button>
      </div>
    </Card>
  );
};

export default SettingsTab;