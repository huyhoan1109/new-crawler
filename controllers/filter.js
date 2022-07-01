const helpers = require('../helpers');
const cheerio = require('cheerio');

async function filter(req, res) {
    const getData = async () => {
      try {
        const html = await helpers.getHtmlData('/tim-truyen');
        $ = cheerio.load(html);
        const categories = [];
        $('.ModuleContent .module-title + .nav li').each((index, element) => {
          const categoryName = $(element).find('a').text();
          const categoryHref = $(element).find('a').attr('href');
          const categoryId = categoryHref.slice(categoryHref.lastIndexOf('/tim-truyen') + 12, categoryHref.length);
  
          categories[categoryId] = {
            name: categoryName,
          };
          });
          const json_data = JSON.stringify(categories, null, 2);
          const status = [
          {
            name: 'Tất cả',
            id: '-1',
          },
          {
            name: 'Hoàn thành',
            id: '2',
          },
          {
            name: 'Đang tiến hành',
            id: '1',
          },
          ];
          const sort = [
          {
            name: 'Ngày cập nhật',
            id: '0',
          },
          {
            name: 'Truyện mới',
            id: '15',
          },
          {
            name: 'Top all',
            id: '10',
          },
          {
            name: 'Top tháng',
            id: '11',
          },
          {
            name: 'Top tuần',
            id: '12',
          },
          {
            name: 'Top ngày',
            id: '13',
          },
          {
            name: 'Số chapter',
            id: '30',
          },
          ];
  
        res.send([
          {
            title: 'Thể loại',
            id: 'category',
            filtersValue: json_data,
          },
          {
            title: 'Trạng thái',
            id: 'status',
            filtersValue: status,
          },
          {
            title: 'Sắp xếp',
            id: 'sort',
            filtersValue: sort,
          },
        ]);
      } catch (error) {
        const { message, name } = error;
        res.send({
          message,
          name,
        });
      }
    };
  getData();
}

module.exports = {
  filter: (req, res) => filter(req, res)
}