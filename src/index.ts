import { server } from "./server/Server"

server.listen(3333, () => {
    return console.log("RUNNING!");
});