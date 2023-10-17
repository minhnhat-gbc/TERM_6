const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    input AddEmployeeInput{
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type Query{
        loginUser(loginInput: LoginInput): User
        getAllEmployee: [Employee]
        getEmployeeByID(id: ID!): Employee

    }

    type Mutation{
        registerUser(registerInput: RegisterInput): User
        addEmployee(addEmployeeInput: AddEmployeeInput): Employee
        updateEmployee(id: String!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!): Employee

        deleteEmployee(id: String!): Employee
    }

` 

