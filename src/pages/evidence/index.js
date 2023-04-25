import React, { Fragment, useEffect, useRef } from "react";
import moment from "moment";
import { Form, Message, Tooltip } from "antd";
import map from "@/utils/dataType";
import { getApplyClientList } from "./service";
import { getStorage } from "@/utils/storageUtil";
// import { modal } from "@/components/common/modal";
import HeaderInfo from "@/components/headerInfo/index";
import XhList from "@/components/xhList/index";
// import ApplyEvidence from "./applyEvidence";
import IconFont from "@/components/Icons/IconFont";

// 申请名称渲染
const applyNameRenderer = (value, record) => {
  const {
    applyWorkType,
    applyWorkQuantity,
    applyWorkStorageType,
    contactName,
    contactPhone,
  } = record;
  return (
    <span>
      <span>{value}</span>
      <span>&nbsp;</span>
      <Tooltip
        title={
          <div>
            <div>【申请内容】</div>
            <div>
              作品类型：
              {applyWorkType.map((item) => applyWorkTypeMap[item]).join(",")}
            </div>
            <div>作品数量：{applyWorkQuantityMap[applyWorkQuantity]}</div>
            <div>
              作品存储方式：
              {applyWorkStorageType
                .map((item) => applyWorkStorageTypeMap[item])
                .join(",")}
            </div>
            <div>联系人：{contactName}</div>
            <div>联系方式：{contactPhone}</div>
          </div>
        }
        overlayStyle={{
          whiteSpace: "nowrap",
          maxWidth: "unset",
        }}
      ></Tooltip>
    </span>
  );
};

const ConfirmEvidence = (props) => {
  // const loginInfo = JSON.parse(getStorage("loginInfo"));
  // this.state = {
  //   loginInfo,
  //   isFirstLoad: false, // 用于标识初次加载
  //   searchParams: {
  //     current: 1,
  //     size: 20,
  //   },
  //   applyNameList: [],
  //   userList: [],
  //   dataSource: [],
  //   columns: [
  //     {
  //       title: "存证申请ID",
  //       align: "left",
  //       width: 186,
  //       dataIndex: "applyId",
  //       key: "applyId",
  //     },
  //     {
  //       title: "存证申请名称",
  //       align: "left",
  //       width: 186,
  //       dataIndex: "applyName",
  //       key: "applyName",
  //       render: applyNameRenderer,
  //     },
  //     {
  //       title: "申请日期",
  //       align: "left",
  //       width: 186,
  //       dataIndex: "applyDate",
  //       key: "applyDate",
  //       render: (value) => moment(value).format("YYYY-MM-DD"),
  //     },
  //     {
  //       title: "实际存证作品数量",
  //       align: "left",
  //       width: 186,
  //       dataIndex: "finalWorkQuantity",
  //       key: "finalWorkQuantity",
  //     },
  //     {
  //       title: "申请状态",
  //       align: "left",
  //       width: 186,
  //       dataIndex: "status",
  //       key: "status",
  //       render: (value) => applyStatusMap[value],
  //     },
  //     {
  //       title: "存证结果",
  //       align: "left",
  //       width: 186,
  //       dataIndex: "options",
  //       key: "options",
  //       render: (text, record) => {
  //         if (record.status !== 40) {
  //           return "--";
  //         } else {
  //           return (
  //             <span
  //               onClick={this.onShowDetailInfo.bind(this, record)}
  //               style={{ color: "#0065D0", cursor: "pointer" }}
  //             >
  //               查看
  //             </span>
  //           );
  //         }
  //       },
  //     },
  //   ],
  //   totalNum: 0,
  //   alert: {
  //     show: false,
  //     isButton: true,
  //     bsSize: "small",
  //     dialogClassName: "custom-modal",
  //     onHide: this.closeAlert,
  //     title: null,
  //     body: null,
  //     submitAlert: null,
  //     visible: false,
  //     width: null,
  //     okText: "确定",
  //     cancelText: "取消",
  //     footer: null,
  //     maskClosable: false,
  //     onCancel: this.closeAlert,
  //   },
  //   modalBox: null,
  //   loading: true,
  // };
  // const queryApplyClientList = (params, isFirstLoad = false) => {
  //   const { dispatch } = this.props;
  //   dispatch(getApplyClientList(params)).then((res) => {
  //     if (res.apiResponse) {
  //       const { records, total } = res.apiResponse;
  //       this.setState({
  //         isFirstLoad,
  //         dataSource: records,
  //         totalNum: total,
  //         loading: false,
  //       });
  //     }
  //   });
  // };
  // useEffect(() => {
  //   const { searchParams } = this.state;
  //   this.queryApplyClientList(searchParams, true);
  // }, []);

  // const onReset = () => {
  //   this.props.form.resetFields();
  //   this.onSearchData();
  // };

  // const onCaseDetail = (record) => {
  //   this.context.router.push({
  //     pathname: "/mediation/detail",
  //     state: { mediationData: record },
  //   });
  // };

  // const onShowDetailInfo = (record) => {
  //   this.context.router.push({
  //     pathname: "/evidence/detail",
  //     state: { evidenceData: record },
  //   });
  // };

  // const onSearchData = (value) => {
  //   const { searchParams } = this.state;
  //   const { date, applyId, applyName, status } = value;
  //   if (!applyId) delete value.applyId;
  //   if (!applyName) delete value.applyName;
  //   if (status === "0") delete value.status;
  //   if (date && date.length > 0) {
  //     value.beginDate = moment(date[0]).format("YYYY-MM-DD");
  //     value.endDate = moment(date[1]).format("YYYY-MM-DD");
  //   }
  //   delete value.date;
  //   const { size } = searchParams;
  //   const params = {
  //     ...value,
  //     current: 1,
  //     size,
  //   };
  //   this.setState({ searchParams: params });
  //   this.queryApplyClientList(params);
  // };

  // const onSearch = (prefix) => {
  //   const { dispatch } = this.props;
  //   if (prefix && prefix.length > 1) {
  //     dispatch(getapplicants({ prefix })).then((res) => {
  //       this.setState({ applyNameList: res.apiResponse });
  //     });
  //   }
  // };

  // const onSearchUser = (value) => {
  //   const {
  //     loginInfo: { orgId },
  //   } = this.state;
  //   const { dispatch } = this.props;
  //   if (value && value.length > 1) {
  //     dispatch(getUserList({ orgId, realName: value })).then((res) => {
  //       this.setState({ userList: res.apiResponse });
  //     });
  //   }
  // };

  // const onShowSizeChange = (current, pageSize) => {
  //   //选择每页显示的条数
  //   let { searchParams } = this.state;
  //   searchParams.current = current;
  //   searchParams.size = pageSize;
  //   this.queryApplyClientList(searchParams);
  // };

  // const onPageChange = (current) => {
  //   //分页选择页数
  //   let { searchParams } = this.state;
  //   searchParams.current = current;
  //   this.queryApplyClientList(searchParams);
  // };

  // const setUserStatus = (data) => {
  //   const { id, enabled } = data;
  //   const { searchParams } = this.state;
  //   const { dispatch } = this.props;
  //   const api = enabled ? "disable" : "enable";
  //   dispatch(updateUserStatus({ id, api })).then((res) => {
  //     this.queryApplyClientList(searchParams);
  //     const {
  //       apiResponse: { success },
  //     } = res;
  //     if (success) Message.success("操作成功");
  //   });
  // };

  // const onSubmit = (params) => {
  //   const { dispatch } = this.props;
  //   dispatch(postEvidenceApply(params)).then((res) => {
  //     const { apiError } = res;
  //     if (apiError) {
  //       Message.error(apiError.errorMessage);
  //     } else {
  //       Message.success("申请成功！");
  //       this.closeAlert();
  //       this.onSearchData();
  //     }
  //   });
  // };
  // const onApplyEvidence = () => {
  //   const config = {
  //     title: (
  //       <div className="xh-modal-title">
  //         <span>申请存证</span>
  //         <IconFont
  //           type="icon-xhbq-Icon-cuowuguanbiquxiao"
  //           onClick={this.close.bind(this)}
  //         />
  //       </div>
  //     ),
  //     body: (
  //       <ApplyEvidence
  //         onSubmit={this.onSubmit.bind(this)}
  //         close={this.close.bind(this)}
  //       />
  //     ),
  //     isButton: false,
  //     width: 510,
  //     type: "form",
  //     wrapClassName: "xh-modal-wrapperClass",
  //     closable: false,
  //   };
  //   this.openAlert(config);
  // };

  // const close = () => {
  //   this.closeAlert();
  //   this.onSearchData();
  // };

  // const closeAlert = () => {
  //   const alert = Object.assign(this.state.alert, { visible: false });
  //   this.setState({ alert: alert });
  //   this.state.modalBox = "";
  //   this.forceUpdate();
  // };

  // const openAlert = (config) => {
  //   const alert = Object.assign(this.state.alert, { visible: true }, config);
  //   this.setState({ alert: alert });
  //   this.state.modalBox = modal(alert);
  //   this.forceUpdate();
  // };
  // const {
  //   columns,
  //   isFirstLoad,
  //   searchParams,
  //   dataSource,
  //   totalNum,
  //   modalBox,
  //   loading,
  // } = this.state;
  // const { getFieldDecorator } = this.props.form;
  // const paginationConfig = {
  //   className: "ant-table-pagination",
  //   current: searchParams.current,
  //   pageSize: searchParams.size,
  //   total: totalNum,
  //   showQuickJumper: true,
  //   showSizeChanger: true,
  //   pageSizeOptions: ["10", "20", "50"],
  //   showTotal: (total) => "共 " + total + " 条",
  //   onShowSizeChange: this.onShowSizeChange,
  //   onChange: this.onPageChange,
  // };
  // const filterConfig = {
  //   show: true,
  //   onSearch: this.onSearchData,
  //   onReset: this.onReset,
  //   formConfig: [
  //     {
  //       name: "date",
  //       key: "date",
  //       label: "申请时间",
  //       placeholder: "",
  //       type: "rangePicker",
  //       width: 240,
  //     },
  //     {
  //       key: "applyId",
  //       label: "",
  //       placeholder: "请输入存证申请ID",
  //       preName: "applyType",
  //       type: "inputGroup",
  //       width: 446,
  //       typeWidth: 136,
  //       typeValue: "1",
  //       placeholderMap: { 1: "请输入存证ID", 2: "请输入存证申请名称" },
  //       nameMap: { 1: "applyId", 2: "applyName" },
  //       typeList: [
  //         {
  //           label: "存证申请ID",
  //           value: "1",
  //         },
  //         {
  //           label: "存证申请名称",
  //           value: "2",
  //         },
  //       ],
  //     },
  //     {
  //       name: "status",
  //       key: "status",
  //       label: "",
  //       placeholder: "全部申请状态",
  //       type: "select",
  //       width: 164,
  //       initialValue: "0",
  //       options: [
  //         {
  //           label: "全部存证申请状态",
  //           value: "0",
  //         },
  //         {
  //           label: "待处理",
  //           value: "10",
  //         },
  //         {
  //           label: "销售接洽中",
  //           value: "20",
  //         },
  //         {
  //           label: "业务处理中",
  //           value: "30",
  //         },
  //         {
  //           label: "已交付",
  //           value: "40",
  //         },
  //         {
  //           label: "已取消",
  //           value: "50",
  //         },
  //       ],
  //     },
  //   ],
  // };

  return (
    <div className="main-content-inner">
      <HeaderInfo
        // imgUrl={require("@/assets/images/page/bg1.png")}
        title={"确权存证"}
        btnText="申请"
        onClick={this.onApplyEvidence.bind(this)}
        tip={
          <Fragment>
            确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍确权存证的业务介绍
          </Fragment>
        }
      />
      <XhList
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        filterConfig={filterConfig}
        paginationConfig={paginationConfig}
        loading={loading}
      />
      {modalBox}
    </div>
  );
};

export default ConfirmEvidence;
