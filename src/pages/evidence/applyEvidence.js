import React, { Component, useState, useEffect } from "react";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Radio from "antd/lib/radio";
import Checkbox from "antd/lib/checkbox";
import Button from "antd/lib/button";
import { getAccountInfo } from "app/action/company_action";
import { applyWorkStorageTypeOptions } from "app/utils/dataType";

const { Item: FormItem, create: createForm } = Form;
const { Group: CheckboxGroup } = Checkbox;
const { Option } = Select;
const { TextArea } = Input;
const ApplyEvidence = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [hasSubmited, setHasSubmited] = useState(false);
  const queryUserList = () => {
    const { dispatch } = this.props;
    dispatch(getAccountInfo()).then((res) => {
      const { apiResponse } = res;
      setAccountInfo(apiResponse);
    });
  };
  useEffect(() => {
    queryUserList();
  }, []);

  const onCancel = () => {
    props.close();
  };
  const onSubmitApply = () => {
    this.props.form.validateFields((error, value) => {
      if (error) return;
      setHasSubmited(true);
      value.platform = 1;
      this.props.onSubmit({ ...value, applyWorkQuantity: 4 });
    });
  };
  const validateApplyName = (rules, value, cb) => {
    if (value.length > 50) {
      cb("存证申请名称请控制在50字以内！");
      return;
    }
    cb();
  };
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const formItemStyle = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="mediationInfo xh-modal-form">
      <div style={{ display: "inline-block" }}>
        <FormItem
          label="存证申请名称"
          {...formItemStyle}
          style={{ marginBottom: "16px" }}
          extra={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  display: "inline-block",
                  textAlign: "left",
                  fontSize: "12px",
                  lineHeight: "20px",
                  color: "#0065D0",
                  width: "285px",
                }}
              >
                存证申请名称用于日常存证申请的管理，命名不影响存证策略
              </span>
              <span style={{ color: "#808B9D" }}>{`${
                getFieldValue("applyName")
                  ? getFieldValue("applyName").length
                  : 0
              }/50`}</span>
            </div>
          }
        >
          {getFieldDecorator("applyName", {
            initialValue: "",
            rules: [
              {
                required: true,
                message: "请输入存证申请名称!",
              },
              { max: 50, message: "存证申请名称请控制在50字以内!" },
            ],
          })(
            <TextArea style={{ width: 336 }} placeholder="请输入存证申请名称" />
          )}
        </FormItem>

        <FormItem
          label="作品类型"
          {...formItemStyle}
          style={{ marginBottom: "16px" }}
        >
          {getFieldDecorator("applyWorkType", {
            rules: [
              {
                required: true,
                message: "请选择作品类型!",
              },
            ],
          })(
            <Select
              mode="multiple"
              placeholder="请选择作品类型"
              style={{ width: 336 }}
              getPopupContainer={(triggerNode) => triggerNode}
            >
              <Option key="1" value="1">
                图片
              </Option>
              <Option key="2" value="2">
                文字
              </Option>
              <Option key="3" value="3">
                视频
              </Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="申请人"
          {...formItemStyle}
          style={{ marginBottom: "16px" }}
          extra={
            <div>
              <span></span>
              <span>{`${
                getFieldValue("applyPerson")
                  ? getFieldValue("applyPerson").length
                  : 0
              }/20`}</span>
            </div>
          }
        >
          {getFieldDecorator("applyPerson", {
            initialValue: accountInfo ? accountInfo.applyPerson : "",
            rules: [
              {
                required: true,
                message: "请输入申请人!",
              },
            ],
          })(<Input style={{ width: 336 }} placeholder="请输入申请人" />)}
        </FormItem>
        <FormItem
          label="联系人"
          {...formItemStyle}
          style={{ marginBottom: "16px" }}
          extra={
            <div>
              <span></span>
              <span>{`${
                getFieldValue("contactName")
                  ? getFieldValue("contactName").length
                  : 0
              }/20`}</span>
            </div>
          }
        >
          {getFieldDecorator("contactName", {
            initialValue: accountInfo.name,
            rules: [
              {
                required: true,
                message: "请输入联系人!",
              },
            ],
          })(<Input style={{ width: 336 }} placeholder="请输入联系人" />)}
        </FormItem>
        <FormItem
          label="联系方式"
          {...formItemStyle}
          style={{ marginBottom: 0 }}
        >
          {getFieldDecorator("contactPhone", {
            initialValue: accountInfo.phone,
            rules: [
              {
                required: true,
                message: "请输入联系方式!",
              },
            ],
          })(<Input style={{ width: 336 }} placeholder="请输入联系方式" />)}
        </FormItem>
      </div>
      <div style={{ textAlign: "right", marginTop: "32px" }}>
        <Button
          onClick={this.onCancel}
          style={{
            fontSize: "16px",
            // borderColor: '#AEBBD2',
            marginRight: "8px",
          }}
        >
          取消
        </Button>
        <Button
          onClick={this.onSubmitApply}
          disabled={hasSubmited}
          type="primary"
          style={{ fontSize: "16px" }}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

export default ApplyEvidence;
