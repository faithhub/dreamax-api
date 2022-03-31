import http from 'http'
import app from './index'
import { Server } from 'socket.io'


function boostrap() {
    const port = process.env.PORT || 8052;

    const server = http.createServer(app);

    // global.io = new Server(server);

    // global.io.on('connection')

    server.listen(port, () => {
        console.log(`Application started on ${port}`)
    })
}

boostrap();