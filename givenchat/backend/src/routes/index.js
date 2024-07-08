const router = require('express').Router();
const authRoutes = require('../app/auth/auth.router.js')

const gamePlanRoutes = require('../app/game_plan/game_plan.router.js')
const chatRoutes = require('../app/chat/chat.router.js')
const messagesRoutes = require("../app/messages/messages.router.js");

const todoProjectsRoutes = require("../app/todoProjects/todoProjects.router.js");

const campaignRoutes = require("../app/campaign/campaign.router.js");

const donationRoutes = require("../app/donation/donation.router.js");



router.use('/auth',authRoutes);
router.use('/game_plan',gamePlanRoutes);
router.use('/chat',chatRoutes);
router.use('/messages', messagesRoutes);

router.use("/todoprojects", todoProjectsRoutes);

router.use("/campaign", campaignRoutes);
router.use("/donation", donationRoutes);

module.exports = router;