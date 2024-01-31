import { server } from "./server/Server"

server.listen(process.env.PORT || 3333, () => {
    return console.log(`RUNNING on port ${process.env.PORT || 3333}`);
});