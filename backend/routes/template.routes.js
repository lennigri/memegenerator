const express = require('express');
const { upload } = require('../middleware/upload.middleware')
const { uploadSingle }  = require('../controller/template.controller')
const router = express.Router();

router.route('/uploadSingle').post(upload.single('file'), uploadSingle)

module.exports = router
