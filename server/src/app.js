const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { errorMiddleware } = require('./middleware/errorMiddlewareHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const routes = require('./routes/mainRouter');
const cronSchedule = require('./schedules/reservationSchedules');

const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

if (process.env.NODE_ENV !== 'test') {
  cronSchedule.initScheduledJobs();
}

app.use(
  cors({
    origin: process.env.BASE_URL
  })
);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use('/', routes);
app.use(errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
