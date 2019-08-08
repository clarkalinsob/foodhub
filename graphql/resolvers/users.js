const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const checkAuth = require("../../util/check-auth");

const {
    validateSignupInput,
    validateSigninInput
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            displayName: user.displayName,
            email: user.email
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );
}

function generatePassword(length) {
    let password = "";
    let charList =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()-=_+[]{};'|,./<>?`~";

    for (let i = 0; i < length; i++) {
        password += charList.charAt(
            Math.floor(Math.random() * charList.length)
        );
    }

    return password;
}

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find().sort({ createdAt: -1 });
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        signin: async (_, { email, password }) => {
            const { errors, valid } = validateSigninInput(email, password);

            if (!valid) {
                throw new UserInputError("Errors", {
                    errors
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                errors.general = "User not found";
                throw new UserInputError("User not found", {
                    errors
                });
            }

            if (!user.password) {
                errors.general = "Try signing in with Google";
                throw new UserInputError("Try signing in with Google", {
                    errors
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = "Wrong credentials";
                throw new UserInputError("Wrong credentials", {
                    errors
                });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        signup: async (
            _,
            {
                signupInput: {
                    givenName,
                    familyName,
                    email,
                    password,
                    confirmPassword
                }
            }
        ) => {
            const { valid, errors } = validateSignupInput(
                givenName,
                familyName,
                email,
                password,
                confirmPassword
            );

            if (!valid) {
                throw new UserInputError("Errors", {
                    errors
                });
            }

            const user = await User.findOne({ email });

            if (user) {
                throw new UserInputError("Email is taken", {
                    errors: {
                        email: "This email is taken"
                    }
                });
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                displayName: `${givenName} ${familyName}`,
                givenName,
                familyName,
                email,
                password,
                role: "Customer",
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },

        signinGoogle: async (_, { token }) => {
            const { name, given_name, family_name, email } = jwt.decode(token);

            const user = await User.findOne({ email });

            if (!user) {
                // errors.general = "User not found";
                throw new Error("User not found");
            }

            user.displayName = name;
            user.givenName = given_name;
            user.familyName = family_name;

            const res = await user.save();

            const newToken = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token: newToken
            };
        },

        signupGoogle: async (_, { token }) => {
            const { name, given_name, family_name, email } = jwt.decode(token);

            const user = await User.findOne({
                email
            });

            if (user) {
                throw new UserInputError("Email is taken", {
                    errors: {
                        email: "This email is taken"
                    }
                });
            }

            const newUser = new User({
                displayName: name,
                givenName: given_name,
                family_name: family_name,
                email,
                role: "Customer",
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const newToken = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token: newToken
            };
        },

        editUser: async (_, { email, role }, context) => {
            const user = checkAuth(context);

            if (role.trim() === "") throw new Error("Role must not be empty");

            const result = await User.findOne({ email });

            if (result) {
                result.role = role;
                await result.save();
                return result;
            } else throw new Error("User not found");
        }
    }
};
