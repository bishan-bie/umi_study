import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Select, Button, Input, Icon } from 'antd';
import IconFont from 'app/components/Icons/IconFont';
import './index.css';
const Option = Select.Option;
const { Item: FormItem, create: createForm } = Form;
const { RangePicker } = DatePicker;

const Filter = ({ form, filterConfig = {} }, ref) => {
  const { getFieldDecorator, getFieldValue } = form;
  const { formConfig = [], onSearch, onReset } = filterConfig;

  useImperativeHandle(ref, () => ({
    formFields: form.getFieldsValue()
  }));
  const renderItem = (row) => {
    const {
      type,
      options = [],
      width,
      typeList = [],
      typeWidth,
      typeValue,
      placeholderMap,
      initialValue,
      preName,
      ...rest
    } = row;

    switch (type) {
      case 'input':
        return <Input {...rest} style={{ width }} autoComplate="off" />;
      case 'rangePicker':
        return (
          <RangePicker
            style={{ width }}
            locale="zh-cn"
            format="YYYY-MM-DD"
            bordered={false}
            placeholder={['开始时间', '结束时间']}
            separator={<Icon type="swap-right" />}
            {...rest}
            suffixIcon={<IconFont type="icon-xhbq-date" />}
          />
        );
      case 'inputGroup':
        // eslint-disable-next-line no-case-declarations
        const prefixSelector = (
          <FormItem>
            {getFieldDecorator(preName, {
              initialValue: typeValue
            })(
              <Select
                style={{ width: typeWidth }}
                dropdownClassName="xh-filter-groupInput xh-selectDropdownClassName"
              >
                {typeList.map((row) => {
                  return (
                    <Option value={row.value} key={row.value}>
                      {row.label}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
        );
        return (
          <Input
            addonBefore={prefixSelector}
            style={{ width }}
            placeholder={
              placeholderMap[getFieldValue(preName)] || placeholderMap[1]
            }
          />
        );
      case 'select':
        return (
          <Select
            style={{ width }}
            {...rest}
            dropdownClassName="xh-selectDropdownClassName"
          >
            {options.map((row) => {
              return (
                <Option key={row.value} value={row.value}>
                  {row.label}
                </Option>
              );
            })}
          </Select>
        );
      default:
        return null;
    }
  };
  const handleSearch = () => {
    const { getFieldsValue, validateFields } = form;
    validateFields((error, value) => {
      if (error) return;
      const values = getFieldsValue();
      console.log('value', value);
      onSearch({ ...values, applyType: undefined });
    });
  };
  const handleReset = () => {
    const { resetFields, setFieldsValue } = form;
    resetFields();
    setFieldsValue({ applyId: '', clientApplyId: '' });
  };
  return (
    <div className="xh-list-filter">
      <Form layout="inline" autoComplete="off">
        {formConfig.map((row) => {
          const { label, name, initialValue, nameMap, key, type, preName } =
            row;
          return (
            <FormItem label={label} key={key}>
              {getFieldDecorator(
                type === 'inputGroup'
                  ? nameMap[getFieldValue(preName)] || nameMap[1]
                  : name,
                {
                  initialValue
                }
              )(renderItem(row))}
            </FormItem>
          );
        })}
      </Form>
      <div className="xh-list-filter-btn">
        <Button
          style={{ width: 60, marginRight: 6, lineHeight: '36px' }}
          onClick={handleSearch}
          className="xh-normal-active-btn"
        >
          查询
        </Button>
        <Button onClick={handleReset} className="xh-normal-active-btn-reset">
          <IconFont
            type="icon-xhbq-delete"
            style={{ fontSize: '20px', verticalAlign: 'middle' }}
          />
          清空选项
        </Button>
      </div>
    </div>
  );
};
Filter.propTypes = {
  form: PropTypes.object,
  filterConfig: PropTypes.object
};
const WrappedForm = Form.create({})(forwardRef(Filter));

export default WrappedForm;
// export default createForm({})(Filter);
