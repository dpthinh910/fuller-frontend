import React from 'react';
import { Menu, Layout, Avatar, Button, Breadcrumb } from 'antd';
import classnames from 'classnames';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useAuth } from 'src/lib/auth';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const Header = ({ fixed, onPress, pathname }: HeaderProps) => {
  const { logout, user } = useAuth();
  const name = pathname.includes('app/') ? pathname.replace('app/', '').split('/')[0] : pathname.replace('app', '');

  const username = user?.username;

  const rightContent = [
    <Menu
      key="user"
      mode="horizontal"
      theme="dark"
      onClick={() => {
        logout();
      }}
    >
      <SubMenu
        key="header-submenu"
        style={{ width: 'calc(100% - 150px)' }}
        title={
          <>
            <span style={{ color: '#999', marginRight: 4 }}>Hi,</span>
            <Avatar style={{ marginLeft: 8 }}>{username}</Avatar>
          </>
        }
      >
        <Menu.Item key="SignOut" icon={<LogoutOutlined />}>
          <span>Sign out</span>
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ];

  return (
    <Layout.Header
      className={classnames(styles.header, {
        [styles.fixed]: fixed,
      })}
      id="layoutHeader"
    >
      <Breadcrumb className={styles.brand}>
        <Breadcrumb.Item>
          <Link to="">Pages</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.rightContainer}>
        <Button type="link" className={styles.sidebarToggle} onClick={onPress} block={false}>
          <MenuOutlined />
        </Button>
        {rightContent}
      </div>
    </Layout.Header>
  );
};

type HeaderProps = {
  fixed: boolean;
  onPress?: React.MouseEventHandler<HTMLElement>;
  pathname: string;
};

export default Header;
