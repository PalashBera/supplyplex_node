export const port = 4000;

export const db = {
  mongodb: {
    url: 'mongodb://localhost:27017/supplyplex',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  }
};

export const secrets = {
  jwt_key: "$2amoVGmf6YnFwh46js9I9T3Ek9HTCw06R4rtWmI"
};
