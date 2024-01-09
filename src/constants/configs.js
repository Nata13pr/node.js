module.exports = {
  PORT : 5000,
  MONGO_URL : 'mongodb://127.0.0.1:27017/cars',
  ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET || 'asd',
  REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET || 'qwe',
  FORGOT_PASS_ACTION_SECRET : process.env.FORGOT_PASS_ACTION_SECRET || 'fg_pass',

  NO_REPLY_EMAIL : process.env.NO_REPLY_EMAIL || 'nata13pr@gmail.ru',
  NO_REPLY_PASSWORD : process.env.NO_REPLY_PASSWORD || '@Nata5121991',
};
