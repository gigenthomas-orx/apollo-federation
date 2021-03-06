const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'content', url: 'http://localhost:4001' },
    { name: 'review', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});


server.listen();