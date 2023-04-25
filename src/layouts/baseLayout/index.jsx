import React from "react";
import { BackTop, Menu } from "antd";
import { Outlet } from "umi";
import styles from "./index.less";
import IconFont from "@/components/Icons/IconFont";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { history } from "umi";
const Layout = (props) => {
  const { children } = props;
  const loginInfo = {};
  const { userType } = loginInfo;

  const handleSelect = (e) => {
    history.push(e.key);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("确权存证", "1", <AppstoreOutlined />, [
      getItem("存证申请", "evidence"),
      getItem("存证结果", "evidence/detail"),
    ]),
    getItem("监测申请", "2", <AppstoreOutlined />, [
      getItem("监测申请", "monitor-1"),
      getItem("监测结果", "monitor-2"),
      ,
    ]),
    getItem("电子证据", "3", <SettingOutlined />, [
      getItem("取证申请", "electronic-1"),
      getItem("取证结果", "electronic-2"),
    ]),
  ];
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["evidence-1"]}
          defaultOpenKeys={["1", "2", "3"]}
          mode="inline"
          items={items}
          onClick={handleSelect}
        />
        {/* <Menu mode="inline" defaultOpenKeys={["1", "2", "3"]}>
          <Menu.SubMenu
            key="1"
            title={
              <span className="xh-menu-text">
                <IconFont type="icon-xhbq-a-Group28" />
                确权存证
              </span>
            }
          >
            <Menu.Item key="/evidence" onClick={handleSelect}>
              存证申请
            </Menu.Item>
            <Menu.Item key="/evidence/detail" onClick={handleSelect}>
              存证结果
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="2"
            title={
              <span className="xh-menu-text">
                <IconFont type="icon-xhbq-a-Group36" />
                网络监测
              </span>
            }
          >
            <Menu.Item key="/monitor-apply" onClick={handleSelect}>
              监测申请
            </Menu.Item>
            <Menu.Item key="/monitor-result" onClick={handleSelect}>
              监测结果
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="3"
            title={
              <span className="xh-menu-text">
                <IconFont type="icon-xhbq-a-Group37" />
                电子证据
              </span>
            }
          >
            <Menu.Item key="/electronic" onClick={handleSelect}>
              取证申请
            </Menu.Item>
            <Menu.Item key="/electronic/result" onClick={handleSelect}>
              取证结果
            </Menu.Item>
          </Menu.SubMenu>
        </Menu> */}
      </div>
      <div className="main-content">
        <Outlet />
      </div>
      <BackTop />
    </div>
  );
};

export default Layout;
