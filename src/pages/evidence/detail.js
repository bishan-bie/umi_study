import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Row, Col, Message } from 'antd';
import { workTypeMap } from 'app/utils/dataType';
import {
  getFileDetailInfo,
  downloadApplyCertificate
} from 'app/action/company_action';

const select = (state) => ({});
@connect(select)
class Detail extends Component {
  constructor(props) {
    super(props);
    const data = [
      {
        id: '1',
        fileType: '数字内容存证证明'
      }
    ];
    this.state = {
      dataSource: data || [],
      fileDetailInfo: {},
      columns: [
        {
          title: '证书类型',
          align: 'center',
          key: 'fileType',
          dataIndex: 'fileType'
        },
        {
          title: '操作',
          align: 'center',
          key: 'operation',
          dataIndex: 'operation',
          render: (text, record) => (
            <Link onClick={this.onDownloadFile.bind(this, record)}>下载</Link>
          )
        }
      ]
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.queryFileDateilInfo();
  }

  queryFileDateilInfo() {
    let {
      dispatch,
      detailData: { id }
    } = this.props;
    dispatch(getFileDetailInfo({ detailId: id })).then((res) => {
      const { apiResponse } = res;
      this.setState({ fileDetailInfo: apiResponse });
    });
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

  onDownloadFile() {
    const {
      dispatch,
      detailData: { id }
    } = this.props;
    dispatch(downloadApplyCertificate({ id })).then((res) => {
      const { apiResponse } = res;
      if (apiResponse) {
        window.open(apiResponse);
      } else {
        Message.error('下载地址无效');
      }
    });
  }

  render() {
    const { columns, dataSource, fileDetailInfo } = this.state;
    const wrapStyle = {
      display: 'flex',
      wordBreak: 'break-all',
      marginBottom: 10
    };
    const ellipsisStyle = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      position: 'relative',
      paddingRight: 60,
      marginBottom: 10
    };
    const labelValue = { color: '#001c4b' };
    const valueStyle = { flex: 1, color: '#001C4B' };
    const copyStyle = {
      display: 'inline-block',
      width: 60,
      textAlign: 'center',
      position: 'absolute',
      right: 0,
      color: '#42A4FF',
      cursor: 'pointer'
    };

    return (
      <div>
        <div style={{ lineHeight: '42px' }}>
          <Row>
            <Col span={14} style={wrapStyle}>
              <span style={labelValue}>文件名称：</span>
              <span style={valueStyle}>{fileDetailInfo.filename}</span>
            </Col>
            <Col span={8} style={wrapStyle}>
              <span style={labelValue}>文件类型：</span>
              <span style={valueStyle}>
                {workTypeMap[fileDetailInfo.fileType]}
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={14} style={wrapStyle}>
              <span style={labelValue}>存证主体：</span>
              <span style={valueStyle}>{fileDetailInfo.applicantOrgName}</span>
            </Col>
            <Col span={8} style={wrapStyle}>
              <span style={labelValue}>登记时间：</span>
              <span style={valueStyle}>{fileDetailInfo.registerTime}</span>
            </Col>
          </Row>
          <Row>
            {/* <Col span={12} style={wrapStyle}>
              <span style={labelValue}>统一社会信用代码：</span>
              <span style={valueStyle}>{fileDetailInfo.unifiedCode}</span>
            </Col> */}
          </Row>
          <Row>
            <Col span={24} style={ellipsisStyle}>
              <span style={labelValue}>时间戳认证码：</span>
              <span style={valueStyle}>{fileDetailInfo.evidenceNumber}</span>
              <span style={copyStyle}>
                <Link
                  onClick={this.onCopy.bind(
                    this,
                    fileDetailInfo.evidenceNumber
                  )}
                >
                  复制
                </Link>
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={ellipsisStyle}>
              <span style={labelValue}>时间戳签发时间：</span>
              <span style={valueStyle}>{fileDetailInfo.fileHash}</span>
            </Col>
          </Row>
        </div>
        {/* <div>
          <span style={{ fontWeight: 'bold' }}>存证证书：</span>
        </div> */}
        {/* <div style={{ padding: '10px 5px' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            onRow={() => ({
              style: {
                fontSize: 14
              }
            })}
          />
        </div> */}
      </div>
    );
  }
}

export default Detail;
