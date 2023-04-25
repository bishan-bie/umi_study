const getUserInfo = (label) => {
  const loginInfo = window.localStorage.getItem('loginInfo');
  const loginInfoJSON = JSON.parse(loginInfo);

  if (!label) {
    return loginInfoJSON[label] || '';
  }
  return '';
};

export default getUserInfo;
