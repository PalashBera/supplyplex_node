export const port = 4000;

export const db = {
  mongodb: {
    url: 'mongodb://localhost:27017/supplyplex',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};
