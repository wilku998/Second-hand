import moment from "moment";

moment.updateLocale("pl", {
  calendar: {
    lastDay: "[Wczoraj] LT",
    sameDay: "[Dzisiaj] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "D MMM",
    nextWeek: "dddd [at] LT",
    sameElse: "D MMM"
  }
});

export default (date: string | number) => moment(date).calendar();
