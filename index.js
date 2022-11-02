const express = require('express');
const { collectDefaultMetrics, register, Counter } = require('prom-client');

const client = require('prom-client');
collectDefaultMetrics();

const app = express();

const counter = new client.Counter({
    name: 'metric_name',
    help: 'metric_help',
  });
register.registerMetric(counter);
register.setDefaultLabels({
  app: 'metric-api'
});

app.get('/metrics', async (_req, res) => {
  try {
    
counter.inc(1); // Increment by 1
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(4001, '0.0.0.0');
