const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'proto', 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const users = {
    '1': { userid: '1', name: 'John Doe', age: 28 },
    '2': { userid: '2', name: 'Jane Smith', age: 34 },
};

function GetUserById(call, callback) {
    const userId = call.request.userid;
    console.log('Received request for user_id:', userId);

    const user = users[userId];
    if (user) {
        console.log('User found:', user);
        callback(null, user);
    } else {
        console.log('User not found');
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'User not found',
        });
    }
}

function main() {
    const server = new grpc.Server();
    server.addService(userProto.UserService.service, { GetUserById });

    const address = '0.0.0.0:50051';
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`User Service is running at ${address}`);
        server.start();  // Add server.start() to make sure the server runs
    });
}

main();
