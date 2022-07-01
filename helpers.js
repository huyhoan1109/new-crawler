const baseUrl = 'http://www.nettruyenco.com';
const axios = require('axios');

const getHtmlData = async(path, options) => {
  let res = await axios.get(baseUrl + path, options);
  return res.data;
};

exports.getHtmlData = getHtmlData