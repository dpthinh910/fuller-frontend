import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { useAuth } from 'src/lib/auth';
import { Link } from 'react-router-dom';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div className={styles.loginPage}>
      <Form
        className={styles.loginPageForm}
        name="normal_login"
        onFinish={async values => {
          await login(values);
          onSuccess();
        }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item>
          <p>Fullerton Dashboard</p>
        </Form.Item>
        <Form.Item label="Username" name="username" rules={[{ required: true }]} hasFeedback>
          <Input prefix={<UserOutlined className={styles.siteIcon} />} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]} hasFeedback>
          <Input.Password type="password" prefix={<LockOutlined className={styles.siteIcon} />} />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoggingIn}>
            Login
          </Button>
        </Form.Item>

        <Form.Item className={styles.loginPageForgot}>
          <Link to="#">Forgot password</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
