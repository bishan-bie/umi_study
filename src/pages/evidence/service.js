import { request } from "umi";
const getApplyClientList = async (params) => {
  const res = await request({
    url: "/v2/right_apply/client",
    method: "get",
    params,
  });
  console.log("res", res);
};
export { getApplyClientList };
