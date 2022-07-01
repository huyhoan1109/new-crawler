const helpers = require('../helpers');
const cheerio = require('cheerio');
const fs = require('fs');

async function category(req, res) {
    const getData = async () => {
      try {
        const html = await helpers.getHtmlData('/tim-truyen');
        $ = cheerio.load(html);
        const categories = {};
        $('.ModuleContent .module-title + .nav li').each((index, element) => {
          const categoryName = $(element).find('a').text();
          const categoryHref = $(element).find('a').attr('href');
          const categoryId = categoryHref.slice(categoryHref.lastIndexOf('/tim-truyen') + 12, categoryHref.length);
  
          categories[categoryId] = {
            name: categoryName 
          };
        });
        const json_data = JSON.stringify(categories, null, 2);
        fs.writeFile('./category.json', json_data, 'utf8', (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`File is written successfully!`);
        }
        });
        res.send(json_data);
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
  category: (req, res) => category(req, res)
}