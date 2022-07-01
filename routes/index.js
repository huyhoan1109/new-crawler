const express = require('express')
const route = express.Router()

const CateController = require('../controllers/category')
const filterController = require('../controllers/filter')
const ListController = require('../controllers/list')
const SearchController = require('../controllers/search')

route.get('/list', ListController.list)
route.get('/filter', filterController.filter)
route.get('/category', CateController.category)
route.get('/search', SearchController.search)

module.exports = route