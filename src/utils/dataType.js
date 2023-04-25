/**
 * Created by tonglaiz on 2016/6/5.
 */
import { NODE_ENV, isDev, isTest, isProd } from "@/utils/env";

const arr2map = (arr) =>
  arr.reduce((obj, { name, value }) => ({ ...obj, [value]: name }), {});
// 作品存储方式
const applyWorkStorageTypeOptions = [
  { name: "本地电脑", value: "1" },
  { name: "公司服务器", value: "2" },
  { name: "云盘", value: "3" },
];
// 线索类型
const clueSourcesOptions = [
  { name: "本系统取证结果", value: "1" },
  { name: "自行取证结果", value: "2" },
];
// 版权类型
const copyrightSourcesOptions = [
  { name: "自有版权", value: "1" },
  { name: "他人授权", value: "2" },
];
// 调解方式
const mediationWaysOptions = [
  { name: "通知删除", value: "1" },
  { name: "调解", value: "2" },
  { name: "诉讼", value: "3" },
];
const clueSourceEvidenceOptions = [
  { name: "本系统监测结果", value: "1" },
  { name: "自行监测结果", value: "2" },
];
/* 电子取证 */
// 取证方式
const obtainWaysOptions = [
  { name: "网页取证", value: "1" },
  { name: "PC端取证", value: "2" },
  { name: "手机端取证", value: "3" },
];
/* 传播监测 */
// 监测网站个数
const applyMonitorWebCountOptions = [
  { name: "10", value: "1" },
  { name: "10~100", value: "2" },
  { name: "大于100", value: "3" },
];
// 监测频次
const applyMonitorFrequencyOptions = [
  { name: "单次", value: "1" },
  { name: "每月一次", value: "2" },
  { name: "每季度一次", value: "3" },
  { name: "每年一次", value: "4" },
];

export default {
  applyStatusMap: {
    10: "待处理",
    20: "处理中",
    30: "已完成",
    40: "已取消",
  },
  applyStatusMapElectronic: {
    10: "待处理",
    20: "销售接洽中",
    30: "待拆分",
    40: "已拆分",
    50: "已取消",
  },
  mediationApplyStatusMap: {
    1: "申请中",
    2: "待处理",
    3: "销售接洽中",
    4: "业务处理中",
    5: "已交付",
    6: "已取消",
    140: "业务处理中",
    141: "已分配",
    142: "已受理",
    143: "已受理",
    144: "已结案",
    145: "已退回",
    146: "送达失败",
  },
  mediateStatusMap: {
    2: "成功-和解",
    3: "失败-拒绝合作",
    4: "成功-合作",
    5: "失败 -未达成一致",
  },
  mediationResultStatusMap: {
    0: "待分配",
    1: "调解中",
    2: "成功-和解",
    3: "失败-拒绝合作",
    4: "成功-合作",
    5: "失败-未达成一致",
  },
  mediateFlowStatusMap: {
    1: "待处理",
    2: "调解中",
    3: "已结案",
    4: "已退回",
  },
  applyWorkTypeMap: {
    1: "文字",
    2: "图片",
    3: "视频",
  },
  applyWorkTypeMapList: [
    {
      label: "文字",
      value: 1,
    },
    {
      label: "图片",
      value: 2,
    },
    {
      label: "视频",
      value: 3,
    },
    {
      label: "音乐",
      value: 4,
    },
    {
      label: "影视",
      value: 5,
    },
    {
      label: "字体",
      value: 6,
    },
    {
      label: "其他",
      value: 7,
    },
  ],
  applyWorkQuantityMap: {
    1: "小于1,000",
    2: "1,000~10,000",
    3: "10,000~100,000",
    4: "大于100,000",
  },
  workTypeMap: {
    1: "文字",
    2: "图片",
    3: "视频",
    4: "音乐",
    5: "影视",
    6: "字体",
    7: "其他",
  },
  taskStatusMap: {
    2: "待处理",
    3: "通知中",
    4: "维权调解中",
  },
  applyWorkStorageTypeOptions,
  applyWorkStorageTypeMap: arr2map(applyWorkStorageTypeOptions),
  clueSourcesOptions,
  clueSourcesMap: arr2map(clueSourcesOptions),
  copyrightSourcesOptions,
  copyrightSourcesMap: arr2map(copyrightSourcesOptions),
  mediationWaysOptions,
  mediationWaysMap: arr2map(mediationWaysOptions),
  clueSourceEvidenceOptions,
  clueSourceEvidenceMap: arr2map(clueSourceEvidenceOptions),
  /* 电子取证 */
  // 取证方式
  obtainWaysOptions,
  obtainWaysMap: arr2map(obtainWaysOptions),
  /* 传播监测 */
  // 监测网站个数
  applyMonitorWebCountOptions,
  applyMonitorWebCountMap: arr2map(applyMonitorWebCountOptions),
  // 监测频次
  applyMonitorFrequencyOptions,
  applyMonitorFrequencyMap: arr2map(applyMonitorFrequencyOptions),
};
