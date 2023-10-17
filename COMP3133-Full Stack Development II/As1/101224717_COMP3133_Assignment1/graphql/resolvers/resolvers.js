const { ApolloError } = require('apollo-server-express')
const User = require('../../models/user')
const Employee = require('../../models/employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.resolvers = {
    Query: {
        async loginUser(parent, { loginInput: { username, password } }) {
            // See if a user exists with the email
            const userCheck = await User.findOne({ username })
            const usernameCheck = await username
            const passCheck = await password

            // Check if the entered password equals the encrypted password
            if (userCheck && (await bcrypt.compare(password, userCheck.password))) {
                // Create a NEW token
                const token = jwt.sign(
                    { user_id: userCheck._id },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                )
                // Attach token to user model that we found above
                userCheck.token = token

                return {
                    id: userCheck.id,
                    ...userCheck._doc
                }
            } else if (usernameCheck == "") {
                throw new ApolloError('Input username', 'EMPTY_INPUT')
            } else if (passCheck == "") {
                throw new ApolloError('Input password', 'EMPTY_INPUT')
            } else {
                // If user doesnt exist, return error
                throw new ApolloError('Incorrect password', 'PASSWORK_UNSUCCESSFULY')
            }


        },
        getAllEmployee: async (parent,) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            return Employee.findById(args.id)
        }
    },
    Mutation: {
        async registerUser(parent, { registerInput: { username, email, password } }) {
            // See if an old user exists with email attempting to register
            // const oldUser = await User.findOne({ username, email })
            const oldUser = await User.findOne({ email })
            const usernameCheck = await username
            const emailCheck = await email
            const passCheck = await password

            // Throw error if that user exists
            if (oldUser) {
                return  new ApolloError('A user is already registered with the email: ' + email, 'USER_ALREADY_EXISTED')
            }

            if (usernameCheck == "") {
                throw new ApolloError('Input username', 'EMPTY_INPUT')
            }
            if (emailCheck == "") {
                throw new ApolloError('Input email', 'EMPTY_INPUT')
            }
            if (passCheck == "") {
                throw new ApolloError('Input password', 'EMPTY_INPUT')
            }


            // Encrypt password
            var encryptPass = await bcrypt.hash(password, 4)

            // Build out mongoose models
            const newUser = new User({
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: encryptPass
            })

            // Create our JWT (attach to our User model)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            )

            newUser.token = token

            // Save our user in MongoDB
            const result = await newUser.save()

            return {
                id: result.id,
                ...result._doc
            }

        },
        async addEmployee(parent, { addEmployeeInput: {
            first_name,
            last_name,
            email,
            gender,
            salary
        } }) {
            const emailCheck = await Employee.findOne({ email })
            const first_nameCheck = await first_name
            const last_nameCheck = await last_name
            const genderCheck = await gender
            const salaryCheck = await salary


            if (emailCheck) {
                throw new ApolloError('An employee is already registered with the email: ' + email, 'EMPLOYEE_ALREADY_EXISTED')
            }
            if (first_nameCheck == "") {
                throw new ApolloError('Input first_name', 'EMPTY_INPUT')
            }
            if (last_nameCheck == "") {
                throw new ApolloError('Input last_name', 'EMPTY_INPUT')
            }
            if (genderCheck == "") {
                throw new ApolloError('Input gender', 'EMPTY_INPUT')
            }
            if (salaryCheck == "" || salaryCheck < 0.0) {
                throw new ApolloError('Input salary correctly', 'EMPTY_INPUT & UNCORRECT_FORM')
            }

            let newEmp = new Employee({
                first_name: first_name.toLowerCase(),
                last_name: last_name.toLowerCase(),
                email: email.toLowerCase(),
                gender: gender.toLowerCase(),
                salary: salary
            })

            const result = await newEmp.save()

            return {
                id: result.id,
                ...result._doc
            }
        },
        updateEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id) {
                let message = "Cannot find the requested employee"
                return message;
            }
            if (args.first_name == "") {
                throw new ApolloError('Input first_name', 'EMPTY_INPUT')
            }
            if (args.last_name == "") {
                throw new ApolloError('Input last_name', 'EMPTY_INPUT')
            }
            if (args.gender == "") {
                throw new ApolloError('Input gender', 'EMPTY_INPUT')
            }
            if (args.salary == "" || args.salary < 0.0) {
                throw new ApolloError('Input salary correctly', 'EMPTY_INPUT & UNCORRECT_FORM')
            }
            if (args.email == "") {
                throw new ApolloError('Input email correctly', 'ERROR_INPUT')
            }
            

            
            return await Employee.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    first_name: args.first_name.toLowerCase(),
                    last_name: args.last_name.toLowerCase(),
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary
                }, 
                { new: true }
            );
        },
        
        deleteEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id) {
                return JSON.stringify({ status: false, "message": "No ID found" });
            }
            return await Employee.findByIdAndDelete(args.id)
        }
    }
}