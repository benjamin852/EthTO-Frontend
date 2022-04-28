import { SIMPLE_POST } from '../constants/CampaignObjectives';

export const onlyNumeric = number => {
  let parsedNum = number.replace(/\,/g, ''); //TODO replace $
  return parseInt(parsedNum);
};

export const outstandingIncrementalOwed = (outstandingIncrementals, incrementalAmount) =>
  outstandingIncrementals * incrementalAmount;

export const outstandingJackpotOwed = (outstandingJackpot, jackpotAmount) => outstandingJackpot * jackpotAmount;

export const getDateFormat = (objective, startDate, deadline) => {
  const dateDeadline = new Date(parseInt(deadline * 1000));
  const yearDeadline = dateDeadline.getFullYear();
  const monthDeadline = dateDeadline.getMonth();
  const dayDeadline = dateDeadline.getDate();

  const formattedDateDeadline = new Date(yearDeadline, monthDeadline, dayDeadline);

  if (objective != SIMPLE_POST) {
    const dateStart = new Date(parseInt(startDate * 1000));
    const yearStart = dateStart.getFullYear();
    const monthStart = dateStart.getMonth();
    const dayStart = dateStart.getDate();
    const formattedDateStart = new Date(yearStart, monthStart, dayStart);

    return [formattedDateStart, formattedDateDeadline];
  } else {
    return formattedDateDeadline;
  }
};
