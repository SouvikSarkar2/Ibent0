const typeDefs = `#graphql
scalar DateTime
input NewUserInput {
    name: String!
    email: String!
    color: String!
    status: String!
    img:String
    events:[NewEventInput!]
  }

  
input UpdateUserInput {
  
    name: String 
    color: String
    status: String
    img:String
  }

  input NewEventInput {
    attendees: Int!
    color: String!
    date: String!
    duration: Int!
    hr: Int!
    mn: Int!
    remainder: Boolean!
    title: String!
    type: String!
    description: String
    createdAt:String!
    coordinates: [Float]
  }



  input UpdateEventInput{
    attendees: Int
    color: String
    date: String
    duration: Int
    hr: Int
    mn: Int
    remainder: Boolean
    title: String
    type: String
    description: String
    coordinates: [Float]
  }



  type Query {
    events(id:String!): [Event!]!
    event(id: String!): Event
    eventByType(id:String!,type:String!):[Event!]!
    users: [User!]!
    user(id: String!): User
    
  }

  type Mutation {
    createEvent(input:NewEventInput!,id:ID!):Event
    updateEvent(id: ID!, input: UpdateEventInput!): Event
  deleteEvent(id: ID!): Event
    createUser(input: NewUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): User
    
  }

  type Event {
    id: String!
    attendees: Int!
    color: String!
    date: String!
    description: String
    duration: Int!
    hr: Int!
    mn: Int!
    remainder: Boolean!
    title: String!
    type: String!
    user: User!
    userId:String!
    createdAt:String!
    coordinates: [Float]
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
