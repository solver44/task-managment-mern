import moment from "moment";

export const calculateSpentTime = (createdAt, submittedAt) => {
  const startTime = moment(createdAt);
  const endTime = moment(submittedAt);
  const duration = moment.duration(endTime.diff(startTime));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;

  if (hours <= 0) {
    return `${minutes} minutes`;
  } else {
    return `${hours} hours ${minutes} minutes`;
  }
};
