/**
 * Created by tonglaiz on 2016/11/29.
 */

const filterData = [
    { // 0
        "id": 0,
        "field": "orderType",
        "text": "合同类型：",
        "children": [
            {
                "text": "长期合同",
                "id": 1
            }, {
                "text": "单张合同",
                "id": 2
            }
        ]
    }, { // 1
        "id": 1,
        "field": "orderState",
        "text": "订单状态：",
        "children": [
            {
                "text": "未提交",
                "id": 0
            }, {
                "text": "待审核",
                "id": 2
            }, {
                "text": "已生效",
                "id": 1
            }
        ]
    }, { // 2
        "id": 2, // [delete]
        "field": "orderHxFlag",
        "text": "核销状态：",
        "children": [
            {
                "text": "未核销",
                "id": 0
            }, {
                "text": "部分核销",
                "id": 2
            }, {
                "text": "已核销完成",
                "id": 1
            }
        ]
    }, { // 3
        "id": 3,
        "field": "textStatus",
        "text": "收发状态：",
        "children": [
            {
                "text": "未发出",
                "id": 0
            }, {
                "text": "已发出",
                "id": 1
            }, {
                "text": "已入库",
                "id": 2
            }
        ]
    }, { // 4
        "id": 4,
        "field": "office",
        "text": "所属区域：",
        "children": [
            {
                "text": "北京",
                "id": 'BJ'
            }, {
                "text": "上海",
                "id": 'SH'
            }, {
                "text": "广州",
                "id": 'HN'
            }, {
                "text": "大连",
                "id": 'QT'
            }
        ]
    }, { // 5
        "id": 5,
        "field": "zptFlag",
        "text": "是否鹰眼：",
        "children": [
            {
                "text": "鹰眼",
                "id": 1
            }, {
                "text": "非鹰眼",
                "id": 0
            }
        ]
    }, { // 6
        "id": 6,
        "field": "valueAddedFlag",
        "text": "是否增值业务：",
        "children": [
            {
                "text": "增值业务",
                "id": 1
            }, {
                "text": "非增值业务",
                "id": 0
            }
        ]
    }, { // 7
        "id": 7,
        "field": "beginTimeVO",
        "text": "开始时间：",
        "type": "time",
        //"itemIsDisplay": false,
        "children": [
            {
                "text": "本月",
                "id": 1
            }, {
                "text": "上月",
                "id": 2
            }, {
                "text": "近三个月",
                "id": 3
            }, {
                "text": "近半年",
                "id": 4
            }, {
                "text": "近一年",
                "id": 5
            }
        ]
    }, { // 8
        "id": 8,
        "field": "effectTimeVO",
        "text": "生效日期：",
        //"itemIsDisplay": false,
        "type": "time",
        "children": [
            {
                "text": "本月",
                "id": 1
            }, {
                "text": "上月",
                "id": 2
            }, {
                "text": "近三个月",
                "id": 3
            }, {
                "text": "近半年",
                "id": 4
            }, {
                "text": "近一年",
                "id": 5
            }
        ]
    }, { // 9
        "id": 9,
        "field": "status",
        "text": "合同状态：",
        "children": [
            {
                "text": "未提交",
                "id": 0
            }, {
                "text": "待审核",
                "id": 2
            }, {
                "text": "已驳回",
                "id": 3
            }, {
                "text": "已生效",
                "id": 1
            }, {
                "text": "已关闭",
                "id": 6
            }
        ]
    }, { // 10
        "id": 10,
        "field": "writeOffStatus",
        "text": "核销状态：",
        "children": [
            {
                "text": "未核销",
                "id": 0
            }, {
                "text": "部分核销",
                "id": 2
            }, {
                "text": "已核销",
                "id": 1
            }
        ]
    }, { // 11
        "id": 11,
        "field": "contractType",
        "text": "合同形式：",
        "children": [
            {
                "text": "长期合同",
                "id": 1
            }, {
                "text": "框架协议",
                "id": 3
            }, {
                "text": "虚拟协议",
                "id": 4
            }
        ]
    }, { // 12
        "id": 12,
        "field": "compensateFlag",
        "text": "是否赔偿：",
        "children": [
            {
                "text": "赔偿",
                "id": 1
            }, {
                "text": "非赔偿",
                "id": 0
            }
        ]
    }, { // 13
        "id": 13,
        "field": "amount",
        "text": "合同金额：",
        "type": "inputRange",
        "children": []
    }, { // 14
        "id": 14,
        "field": "testSelectId",
        "text": "测试Select：",
        "type": "select",
        "placeholder": "请测试Select",
        "selectOptions": [
            {
                "value": "id0001",
                "text": "test"
            }
        ],
        "children": [] // text
    }, { // 15
        "id": 15,
        "field": "testFuzzySearch",
        "text": "测试FuzzySearch：",
        "type": "fuzzySearch",
        "placeholder": "请测试FuzzySearch",
        "action": "queryCustomerName",
        "selectOptions": [],
        "children": [] // text
    }, { // 16
        "id": 16,
        "field": "testSelectInit",
        "text": "测试SelectInit：",
        "type": "select",
        "placeholder": "请测试SelectInit",
        "selectOptions": [],
        "children": [] // text
    }
];

export default {
    list: (...arg) => Array.from([...arg]).map(id => filterData.find(item => item.id == id)),
    get: (id, list = filterData) => list.find(item => item.id == id),
    index: (id, list = filterData) => list.findIndex(item => item.id == id),
    compare: (data1, data2) => {
        let flag = true;
        if (Array.isArray(data1)) {
            if (data1.length != data2.length) {
                flag = false;
            } else {
                for (let i = 0; i < data1.length; i++) {
                    if (JSON.stringify(data1[i]) != JSON.stringify(data2[i])) {
                        flag = false;
                        break;
                    }
                }
            }
        } else if (typeof data1 === 'object') {
            flag = JSON.stringify(data1) == JSON.stringify(data2)
        } else {
            flag = data1 == data2
        }
        return flag;
    }
};