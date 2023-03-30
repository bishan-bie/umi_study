import { Menu, Layout } from "antd";
import { Outlet } from "umi";
import styles from "./index.less";
const { Header, Footer, Sider, Content } = Layout;
const BaseLayout = ({ children }) => {
  const items: Array<T> = [];
  return (
    <Layout className={styles.layout}>
      <Header></Header>
      <Layout>
        <Sider>
          <Menu
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Content>
          <Outlet />
          <Footer>Footer</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
