import { Fragment } from "react";
import "./index.css";

const footerConfig = {
  left: [
    {
      key: "adress",
      label: "地址",
      value: "江苏省常州市武进区西太湖科技产业园禾香路123号6号楼一楼102室",
      br: true,
    },
    {
      key: "phone",
      label: "联系电话",
      value: "400-818-2525",
      style: {
        width: "400px",
      },
    },
    {
      key: "email",
      label: "邮箱",
      value: "jubao@vcg.com",
      style: {
        width: "300px",
      },
    },
  ],
  right: [
    {
      key: "copyright",
      label: "© 汉华易美视觉科技有限公司 All Rights Reserved",
      value: "",
      style: {
        width: "300px",
        textAlign: "right",
      },
    },
    {
      key: "record1",
      label: "苏公网安备 32041202001826号",
      value: "",
      style: {
        textAlign: "right",
      },
    },
    {
      key: "record2",
      label: "苏公网安备 32041202001826号",
      value: "",
      style: {
        textAlign: "right",
      },
    },
  ],
};
const Footer = () => {
  const { left, right } = footerConfig;
  return (
    <div className="xh-home-footer-wrapper">
      <div>
        {left.map((row) => {
          return (
            <div style={row.style} key={row.key}>
              <span>{row.label}</span>
              {row.value && <span>：{row.value}</span>}
            </div>
          );
        })}
      </div>
      <div>
        {right.map((row) => {
          return (
            <div style={row.style} key={row.key}>
              <span>{row.label}</span>
              {row.value && <span>：{row.value}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
