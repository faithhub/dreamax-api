import http from 'http'
import app from './app'
import { Server } from 'socket.io'
import Websockets from './utils/websockets';


function boostrap() {
    const port = process.env.PORT || 8052;

    const server = http.createServer(app);

    const io = new Server(server);

    io.on('connection', Websockets.connection);

    server.listen(port);

    server.on("listening", () => {
        console.log(`Listening on port:: http://localhost:${port}/`)
      });


}

boostrap();