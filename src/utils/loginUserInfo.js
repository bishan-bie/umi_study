import {setStorage, getStorage, clearStorage} from 'app/utils/storageUtil';

export default function getLoginUserInfo(){
	return {
		loginUserInfo : JSON.parse(getStorage('loginUserInfo')) || {},
		loginUserRole : JSON.parse(getStorage('loginUserRole')) || []
	}
}

export function loginTimeout(){
    let loginTime = getStorage('loginTime') || undefined;
    let currentTime = new Date().getTime();
    let outTime = currentTime - loginTime;
    let currentS = outTime / 1000; //秒
    //60*60*11.5//十一个半小时
    let responseTime = 60 * 60 * 11.5;
    if (currentS > responseTime) {
        clearStorage();
        setStorage('loginOutTime', "out"); //此标识在login/index.js用作登录超时提示
        setStorage('lastUrl', window.location.pathname);
        // window.location = "/login";
    }
}

export function getLoginUserRole(){
    let roleMap = {};
	let userInfo = getLoginUserInfo();
    let loginUserRole = userInfo.loginUserRole;
    let loginUserInfo = userInfo.loginUserInfo;
    if(loginUserInfo.name == 'gew'){
        loginUserRole.push('sales_qt');
    }
    loginUserRole.map((role, i)=>{
        /*******************************************************************************
        *   flag状态：查询数据权限标识。0：仅查询自己、1：查询全部。
        *   只有销售角色能查询自己。当出现销售角色和其它角色存在同一个账号时按全部查询数据
        ********************************************************************************/
        role = role.toLowerCase();//方便处理，将权限code转为小写
        if(role == 'sales'){
            setStorage('flag', '0');//销售自己数据
        }else{
            setStorage('flag', '1');//全部数据
        }
        /*******************************************************************************
        *   1、所有区域运营功能权限都是一致的,将权限码设置为一个。operation-area
        *      如：operation-bj、operation-sh、operation-gz
        *   2、大连运营区别于其它城市的运营，多了两个权限：律师事务所管理、侵权管理
        *
        ********************************************************************************/
       if(role.indexOf('bi') > -1){
            /************************************BI权限**********************************************/
                if(role.indexOf('bi_sales') > -1){//BI 销售
                    roleMap['bi_sales'] = true;
                }

                if(role.indexOf('bi_operation') > -1){//BI 运营
                    roleMap['bi_operation_area'] = true;
                }

                if(role.indexOf('bi_finance') > -1 || role.indexOf('bi_auditor') != -1){//BI 财务
                    if(role == 'bi_finance'){//运营经理
                        roleMap['bi_finance'] = true;
                    }
                    roleMap['bi_finance_area'] = true;
                }

                if(role.indexOf('bi_provider') > -1){//BI
                    role = 'bi_provider';
                }

                if(role.indexOf('bi_editor') > -1){//BI
                    role = 'bi_editor';
                }
            /***********************************BI权限***********************************************/
        }else{
            if((role == 'sales' || role.indexOf('sales_') > -1)){//普通销售和销售经理
                roleMap['sales'] = true;
            }
            
            if(role == 'operation_qt'){//大连运营
                
            }else if(role == 'operation_all'){//运营经理
                roleMap['operation'] = true;
            }else if(role.indexOf('operation_') > -1 && role != 'operation_hw'){//所有区域运营(包含大连运营)
                roleMap['operation_area'] = true;
            }

            if(role == 'finance_all'){//财务经理
                roleMap['finance'] = true;
            }else if(role.indexOf('finance_') > -1){//所有区域财务
                roleMap['finance_area'] = true;
            }
        }
        roleMap[role] = true;
        if(!roleMap.isOperation && role.indexOf('operation') != -1){
            roleMap.isOperation = true;
        }
    });

	return roleMap;
}