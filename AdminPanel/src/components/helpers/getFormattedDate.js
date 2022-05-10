const getFormattedDate = (timestamp) => {
  let date = new Date(timestamp * 1000);

  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;

  let str = day + "." + month + "." + date.getFullYear();

  return str;
};

export default getFormattedDate;
