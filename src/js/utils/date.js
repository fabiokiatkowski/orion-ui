import moment from 'moment';

export default (dt, format = 'DD/MM/YY') => {
  if (!dt) {
    return ' ';
  }
  return moment(dt).utc().format(format);
};
