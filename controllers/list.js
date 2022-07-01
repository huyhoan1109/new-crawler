const helpers = require('../helpers');
const cheerio = require('cheerio');
const fs = require('fs');

async function list(req, res) {
    const { page = 1, status, sort, category } = req.query;
  
    let path = category ? `/tim-truyen/${category}` : '/tim-truyen';
  
    let myParams = {
      status: status,
      sort: sort,
      page: page,
    };
  
    if (sort == 0 && status == 2 && category === '') {
      path = '/truyen-full';
      myParams = {};
    }
  
    const getData = async () => {
      try {
        const html = await helpers.getHtmlData(path, {
          params: {
            ...myParams,
          },
        });
        $ = cheerio.load(html);
        const data = {};
        $('.ModuleContent .items .row .item').each((index, element) => {
          const mangaName = $(element).find('.jtip').text();
          const posterUrl = $(element).find('.image a img').attr('data-original');
          const newestChapterText = $(element).find('ul .chapter:nth-child(1) a').text();
  
          const newestChapterTime = $(element).find('ul .chapter:nth-child(1) i').text();
  
          const href = $(element).find('.image a').attr('href');
          const id = href.slice(href.lastIndexOf('/') + 1, href.length);
  
          const chapterHref = $(element).find('ul .chapter:nth-child(1) a').attr('href');
          const chapterId = chapterHref.slice(chapterHref.indexOf('truyen-tranh/') + 13, chapterHref.length);
  
          data[id] = {
            mangaName,
            posterUrl: posterUrl,
            newestChapter: {
              chapterName: newestChapterText,
              chapterId,
              updatedAt: newestChapterTime,
            },
          };
        });
        const lastPageHref = $('.pagination').find('li:last-child a').attr('href');
        let lastPageCount = lastPageHref ? lastPageHref.slice(lastPageHref.indexOf('page=') + 5, lastPageHref.length) : 1;
        lastPageCount = Number(lastPageCount); 

        const json_data = JSON.stringify(data, null, 2);
        fs.writeFile('./list.json', json_data, 'utf8', (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`File is written successfully!`);
        }
        });
        
        res.send({
          data: json_data,
          pagination: {
            currentPage: Number(page) > lastPageCount ? lastPageCount : Number(page),
            totalPage: lastPageCount,
          },
        });
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
  list: (req, res) => list(req, res)
}
