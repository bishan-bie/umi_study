import React, { Fragment } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import "./index.css";

const HeaderInfo = ({
  imgUrl,
  onClick,
  tip,
  title,
  processList = [],
  btnText,
}) => {
  return (
    <div
      className="page-content mainground xh-headerInfo-wrapper"
      style={{
        paddingRight: 250,
        position: "relative",
        backgroundImage: `url(${imgUrl}) `,
      }}
    >
      <h3 style={{ margin: "10px 0", color: "#001C4B", fontWeight: 600 }}>
        {title}
      </h3>
      <div
        style={{
          color: "#001C4B",
          fontSize: "12px",
          width: "560px",
          lineHeight: "17px",
          marginBottom: "12px",
        }}
      >
        {tip}
      </div>
      {!isEmpty(processList) && (
        <div className="process-item-wrapper">
          {processList.map((row, index) => {
            if (index === processList.length - 1) {
              return (
                <span key={index} className="process-item">{`${row}`}</span>
              );
            }
            return (
              <span key={index}>
                <span className="process-item">{`${row}`}</span>
                <img
                  className="process-item-arrow"
                  width={16}
                  src={require("@/assets/yay.jpg")}
                />
              </span>
            );
          })}
        </div>
      )}
      <div>
        <Button type="primary" onClick={onClick}>
          {btnText}
        </Button>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 60,
          transform: "translateY(-50%)",
        }}
      ></div>
    </div>
  );
};
HeaderInfo.propTypes = {
  imgUrl: PropTypes.string,
  onClick: PropTypes.func,
  tip: PropTypes.any,
  title: PropTypes.any,
  btnText: PropTypes.any,
  processList: PropTypes.array,
};

export default HeaderInfo;
