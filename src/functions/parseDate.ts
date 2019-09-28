import moment from "moment";
moment.locale("pl");

export default (date: string) => moment(parseInt(date)).calendar();
