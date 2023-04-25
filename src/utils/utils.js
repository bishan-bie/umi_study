const ellipsisDisplay = (str, count = 20) => {
  if (!str) {
    return '';
  }
  const length = str.length;
  if (length <= count) {
    return str;
  } else {
    return `${str.substring(0, count)}...`;
  }
};

export { ellipsisDisplay };
