import { getAllData } from './model.js';
import {
  loadCardsByTimeframe,
  reloadCardsByTimeframe,
  setButtonActive,
} from './view.js';

const defaultTimeFrame = 'daily';

const timeFrameFilterDaily = document.getElementById('timeframe-daily');
const timeFrameFilterWeekly = document.getElementById('timeframe-weekly');
const timeFrameFilterMonthly = document.getElementById('timeframe-monthly');

//Attach event listeners
timeFrameFilterDaily.addEventListener('click', async (e) => {
  await reloadCardsByTimeframe('daily');
  setButtonActive(e);
});

timeFrameFilterWeekly.addEventListener('click', async (e) => {
  await reloadCardsByTimeframe('weekly');
  setButtonActive(e);
});

timeFrameFilterMonthly.addEventListener('click', async (e) => {
  await reloadCardsByTimeframe('monthly');
  setButtonActive(e);
});

//initailize the UI
const main = async () => {
  const data = await getAllData();
  const dailySelector = document.getElementById('timeframe-daily');
  dailySelector.classList.add('active');
  loadCardsByTimeframe(data, defaultTimeFrame);
};

main();

console.log('index.js loaded');
