const typeDefs = `#graphql
scalar DateTime
input NewUserInput {
    name: String!
    email: String!
    color: String!
    status: String!
    img:String
  }

  input NewEventInput {
    attendees: String!
    color: String!
    date: String!
    duration: Int!
    hr: String!
    mn: String!
    remainder: Boolean!
    title: String!
    type: String!
    userId: String!
    description: String
  }

scalar UpdateEventInput
scalar UpdateUserInput



  type Query {
    events: [Event!]!
    event(id: String!): Event
    users: [User!]!
    user(id: String!): User
  }

  type Mutation {
    createEvent(input:NewEventInput!):Event
    updateEvent(id: ID!, input: UpdateEventInput!): Event
  deleteEvent(id: ID!): Event
    createUser(input: NewUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): User
    
  }

  type Event {
    id: String!
    attendees: String!
    color: String!
    date: DateTime!
    description: String
    duration: Int!
    hr: String!
    mn: String!
    remainder: Boolean!
    title: String!
    type: String!
    user: User!
    userId:String!
  }

  type User {
    id: String!
    color: String!
    email: String!
    events: [Event!]!
    img: String
    name: String!
    status: String!
  }
`;

export default typeDefs;
