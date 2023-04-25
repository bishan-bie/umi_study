import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { Icon, Form, Input, Button, Table, Pagination, Message } from 'antd';
import { modal } from 'app/components/common/modal';
import Detail from 'app/containers/evidence/detail';
import { getApplyClientDetailList } from 'app/action/company_action';
import { workTypeMap } from 'app/utils/dataType';
import IconFont from 'app/components/Icons/IconFont';
import XhList from '../components/xhList/index';

const { Item: FormItem, create: createForm } = Form;

const select = (state) => ({});
@connect(select)
class EvidenceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // {
        //   title: '作品ID',
        //   align: 'center',
        //   key: 'workId',
        //   dataIndex: 'workId'
        // },
        {
          title: '文件名',
          align: 'left',
          key: 'filename',
          dataIndex: 'filename',
          width: 640
        },
        {
          title: '文件类型',
          align: 'left',
          key: 'fileType',
          dataIndex: 'fileType',
          width: 240,
          render: (value) => workTypeMap[value]
        },
        // {
        //   title: '统一证据编号',
        //   align: 'center',
        //   key: 'evidenceNumber',
        //   dataIndex: 'evidenceNumber',
        //   render: (text) => (
        //     <div>
        //       <div
        //         title={text}
        //         className="overflow"
        //         style={{
        //           display: 'inline-block',
        //           verticalAlign: 'top'
        //         }}
        //       >
        //         {text}
        //       </div>
        //       <Link
        //         onClick={this.onCopy.bind(this, text)}
        //         style={{
        //           position: 'absolute',
        //           display: 'inline-block'
        //         }}
        //       >
        //         复制
        //       </Link>
        //     </div>
        //   )
        // },
        // {
        //   title: '登记时间',
        //   align: 'center',
        //   key: 'registerTime',
        //   dataIndex: 'registerTime'
        // },
        {
          title: '操作',
          align: 'left',
          key: 'operations',
          dataIndex: 'operations',
          render: (text, record) => (
            <span
              onClick={this.onOpenDetail.bind(this, record)}
              className="xh-list-operate"
            >
              详情
            </span>
          )
        }
      ],
      searchParams: {
        current: 1,
        size: 20
      },
      dataSource: [],
      totalNum: 0,
      alert: {
        show: false,
        isButton: true,
        bsSize: 'small',
        dialogClassName: 'custom-modal',
        onHide: this.closeAlert,
        title: null,
        body: null,
        submitAlert: null,
        visible: false,
        width: null,
        okText: '确定',
        cancelText: '取消',
        footer: null,
        maskClosable: false,
        onCancel: this.closeAlert
      },
      modalBox: null,
      detailInfo: {},
      loading: true
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { searchParams } = this.state;
    this.queryApplyClientDetailList(searchParams);
  }

  queryApplyClientDetailList(params) {
    const {
      dispatch,
      location: { state }
    } = this.props;
    const {
      evidenceData: { id }
    } = state && state.evidenceData ? state : { evidenceData: { id: '' } };
    params.applyId = id;
    dispatch(getApplyClientDetailList(params)).then((res) => {
      const { apiResponse } = res;
      let record = [];
      let totalNum = 0;
      if (apiResponse && apiResponse.data) {
        record = apiResponse.data.records;
        totalNum = apiResponse.data.total;
      }
      this.setState({
        dataSource: record,
        detailInfo: apiResponse,
        totalNum,
        loading: false
      });
    });
  }

  onReset = () => {
    this.props.form.resetFields();
    this.onSearchData();
  };

  onOpenDetail(data) {
    const config = {
      title: (
        <div className="xh-modal-title">
          <span>存证详情</span>
          <IconFont
            type="icon-xhbq-Icon-cuowuguanbiquxiao"
            onClick={this.close.bind(this)}
          />
        </div>
      ),
      body: <Detail detailData={data} close={this.close.bind(this)} />,
      isButton: false,
      width: 800,
      type: 'form',
      wrapClassName: 'xh-modal-wrapperClass',
      closable: false
    };
    this.openAlert(config);
  }

  close() {
    this.closeAlert();
  }

  onCopy(value) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', value);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      Message.success('复制成功');
    }
    document.body.removeChild(input);
  }

  onSearchData = () => {
    const { searchParams } = this.state;
    this.props.form.validateFields((error, value) => {
      if (error) return;
      const { filename } = value;
      if (!filename) delete value.filename;
      const { size } = searchParams;
      const params = {
        ...value,
        current: 1,
        size
      };
      this.setState({ searchParams: params });
      this.queryApplyClientDetailList(params);
    });
  };

  onSelect = (v) => {};

  onSearch = (prefix) => {
    const { dispatch } = this.props;
    if (prefix && prefix.length > 1) {
      dispatch(getapplicants({ prefix })).then((res) => {
        this.setState({ applyNameList: res.apiResponse });
      });
    }
  };

  onSearchUser = (value) => {
    const {
      loginInfo: { orgId }
    } = this.state;
    const { dispatch } = this.props;
    if (value && value.length > 1) {
      dispatch(getUserList({ orgId, realName: value })).then((res) => {
        this.setState({ userList: res.apiResponse });
      });
    }
  };

  onShowSizeChange = (current, pageSize) => {
    //选择每页显示的条数
    let { searchParams } = this.state;
    searchParams.current = current;
    searchParams.size = pageSize;
    this.setState({ searchParams });
    this.queryApplyClientDetailList(searchParams);
  };

  onPageChange = (current) => {
    //分页选择页数
    let { searchParams } = this.state;
    searchParams.current = current;
    this.setState({ searchParams });
    this.queryApplyClientDetailList(searchParams);
  };

  closeAlert = () => {
    const alert = Object.assign(this.state.alert, { visible: false });
    this.setState({ alert: alert });
    this.state.modalBox = '';
    this.forceUpdate();
  };

  openAlert(config) {
    const alert = Object.assign(this.state.alert, { visible: true }, config);
    this.setState({ alert: alert });
    this.state.modalBox = modal(alert);
    this.forceUpdate();
  }

  render() {
    const {
      columns,
      dataSource,
      searchParams,
      totalNum,
      modalBox,
      detailInfo = {},
      loading
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const paginationConfig = {
      className: 'ant-table-pagination',
      current: searchParams.current,
      pageSize: searchParams.size,
      total: totalNum,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50'],
      showTotal(total) {
        return '共 ' + total + ' 条';
      },
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.onPageChange
    };
    const filterConfig = {
      show: true,
      formConfig: [
        {
          name: 'applyId',
          key: 'applyId',
          label: '',
          placeholder: '',
          type: 'input',
          width: 936,
          placeholder: '请输入存证申请ID'
        }
      ]
    };
    return (
      <div className="main-content-inner">
        {/* <div className="page-content mainground">
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            <span>存证申请名称：{detailInfo.applyName}</span>
          </div>
          <div style={{ margin: '7px 0' }}>
            <span>存证申请ID：{detailInfo.applyId}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>
              申请日期：{moment(detailInfo.applyDate).format('yyyy-MM-DD')}
            </span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>存证作品数量：{detailInfo.finalWorkQuantity || 0}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>交付日期：{detailInfo.endDate || '未交付 '}</span>
          </div>
        </div>
        <br /> */}
        <XhList
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          onRow={() => ({
            style: {
              fontSize: 14
            }
          })}
          rowKey="id"
          filterConfig={filterConfig}
          paginationConfig={paginationConfig}
          loading={loading}
        />

        {/* <div
            style={{
              position: 'relative',
              paddingRight: 250,
              marginBottom: 20
            }}
          >
            <Form layout="inline">
              <FormItem>
                {getFieldDecorator('filename', { initialValue: '' })(
                  <Input style={{ width: 200 }} placeholder="请输入文件名称" />
                )}
              </FormItem>
            </Form>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: 30,
                transform: 'translateY(-50%)'
              }}
            >
              <Button
                style={{ width: 80 }}
                type="primary"
                onClick={this.onSearchData}
              >
                查询
              </Button>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Button style={{ width: 80 }} onClick={this.onReset}>
                重置
              </Button>
            </div>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              onRow={() => ({
                style: {
                  fontSize: 14
                }
              })}
            />
          </div>
          <div style={{ height: '60px' }}>
            <Pagination {...paginationConfig} />
          </div> */}
        {modalBox}
      </div>
    );
  }
}

export default createForm({})(EvidenceDetail);
