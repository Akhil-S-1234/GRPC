const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PROTO_PATH = path.join(__dirname, 'proto', 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(typeof userId)
    console.log('Requesting user with id:', userId);

    client.GetUserById({ userid: userId }, (error, response) => {
        if (error) {
            console.error('Error:', error);
            return res.status(404).send(error.details);
        }
        console.log('Response:', response);
        res.json(response);
    });
});

app.listen(3000, () => {
    console.log('Client Service running on port 3000');
});
