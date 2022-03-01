import React, { useState } from 'react';
import { Drawer, Layout } from 'antd';
import Header from '../Header';
import SideNav from '../SideMenu';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

type Props = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const [fixed, setFixed] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  const openDrawer = () => setVisible(!visible);
  const handleFixedNavBar = (type: boolean) => setFixed(type);

  return (
    <Layout className={styles.layoutDashboard}>
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key="left"
        width={250}
      >
        <Layout className={styles.layoutDashboard}>
          <Sider trigger={null} width={250} theme="dark" onClick={() => setVisible(!visible)}>
            <SideNav location={location} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider breakpoint="lg" collapsedWidth="0" trigger={null} width={250} theme="dark">
        <SideNav location={location} />
      </Sider>
      <Layout>
        <Header onPress={openDrawer} fixed={fixed} pathname={pathname} />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
