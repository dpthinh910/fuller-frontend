import React from 'react';
import { Menu } from 'antd';
import { FileImageOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from 'src/assets/logo/logo.png';
import styles from './index.module.scss';
import { useAuth } from '../../lib/auth';

const SideNav = ({ location }: SideMenuProps) => {
  const { user } = useAuth();

  const currentMenuKey = (key: string) => {
    if (location.pathname.search(key) > 0) {
      return location.pathname;
    } else {
      return key;
    }
  };

  return (
    <>
      <div className={styles.logo}>
        <img src={logo} width={56} height={76} />
      </div>
      <Menu mode="inline" theme="dark" selectedKeys={[location.pathname]}>
        {user && user.role === 'admin' ? (
          <Menu.Item key={currentMenuKey('/app')} icon={<HomeOutlined />}>
            <Link to="">Dashboard</Link>
          </Menu.Item>
        ) : (
          <Menu.Item key={currentMenuKey('/user')} icon={<FileImageOutlined />}>
            <Link to="/user">Bookings</Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

type SideMenuProps = {
  location: any;
};

export default SideNav;
