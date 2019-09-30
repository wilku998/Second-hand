import moment from "moment";
moment.locale("pl");

export default (date: string | number) => moment(date).calendar();
