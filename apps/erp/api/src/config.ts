export const GlobalConfig = {
  Pagination: {
    PageDefault: 1,
    LimitDefault: 10,
    LimitMaximum: 50,
  },
  Authentication: {
    ServerKey: 'SAMPLE_SERVER_KEY',
    ServerKeyRefresh: 'SAMPLE_SERVER_KEY_REFRESH',
    ExpiresIn: '1d',
    ExpiresInRefresh: '10d'
  },
  Database: {
    MongoURI: process.env.MONGO_URI,
  },
  DIR: process.env.IS_DEV === 'true' ? process.cwd() : __dirname
};
