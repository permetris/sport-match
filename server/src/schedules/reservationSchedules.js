const cron = require('node-cron');

const { checkEligibleReservations } = require('../utils/checkEligibleReservations');
const { checkFinishedMatchResults } = require('../utils/resultsReminderEmail');

console.log("This is my log ",process.env.CRON_WEATHER);
const initScheduledJobs = () => {
  const checkWeatherJob = cron.schedule(process.env.CRON_WEATHER, async () => {
    checkEligibleReservations();
  });

  const checkResults = cron.schedule(process.env.CRON_RESULT, async () => {
    checkFinishedMatchResults();
  });

  checkWeatherJob.start();
  checkResults.start();
};

module.exports.initScheduledJobs = initScheduledJobs;
