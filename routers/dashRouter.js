const express = require('express');
const { getDashInfo, addRecentAchievements } = require('../controller/dashController');
const dashRouter = express.Router();

dashRouter.route('/:id')
    .get(getDashInfo)
    .patch(addRecentAchievements)

module.exports = dashRouter;