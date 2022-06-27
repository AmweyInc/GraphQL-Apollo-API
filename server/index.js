const express = require('express');
const env = require('dotenv');
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./Schema/Schema.js')


const app = express();
const users = [{id: 1, username: 'Anatoliy', age:25},{id: 2, username: 'Eugene', age:28}];

const createUser = (input) => {
    const id = Date.now();
    return{
        id,...input
    }
}

const resolver = {
    getAllUsers: () => {
        return users;
    },
    getUser:({id}) => {
        return users.find(user => user.id === id);
    },
    createUser:({input}) => {
        const user = createUser(input);
        users.push(user)
        return user;
    }
}

env.config();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolver,
}))



app.listen(process.env.PORT,() => console.log('Server has been started on port:' + process.env.PORT));