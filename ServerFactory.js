import * as http from "http"
import findFreePorts from "find-free-ports"
import Server from "./Server.js"
import DatabaseFactory from "./DatabaseFactory.js"
import Utils from "./Util.js"

const host = '127.0.0.1'
var configuration = undefined

export default class ServerFactory {

    constructor() {
        this.servers = new Map()
    }

    getServers() {
        return this.servers
    }
    getServerName(index){
        return this.servers.get(`${index}`).name
    }

    getServerWithMinConnectionsIndex(){
        let iterator1 = this.servers.keys();
        let minkey = iterator1.next().value
        let minsessions = this.servers.get(minkey).getNoSessions()

        for (let [key, server] of this.servers) {
            if(server.getNoSessions() < minsessions){
                minkey = key
                minsessions = server.getNoSessions() 
            }
        }
        return minkey
    }

    async createServers(configuration_) {
        configuration = configuration_
        DatabaseFactory.createDatabases(configuration)

        let freeports = await findFreePorts(configuration.NoServers);

        for (let i = 0; i < freeports.length; i++) {
            let port = freeports[i]

            let maxSessions = Utils.getRandomInt(configuration.MinNoSessionsPerServer, configuration.MaxNoSessionsPerServer)
            let processTime = Utils.getRandomInt(configuration.MinProcessingTime, configuration.MaxProcessingTime) 

            let server = new Server(`S${i}`,`http://${host}:${port}`, maxSessions, processTime)
            this.servers.set(`S${i}`, server)

            let httpserver = http.createServer(
                async function (req, res) {
                    res.setHeader("Content-Type", "application/json");
                    switch (req.url) {
                        case "/":
                            res.writeHead(200);
                            res.end(`Server ${i} is running on http://${host}:${port}`);
                            break
                        default:
                            res.writeHead(200);
                           
                            let requestPayloadRange = Utils.getRandomInt(configuration.MinSizeRequestPayload, configuration.MaxSizeRequestPayload) //random between 1MB and 100MB
                            let saved = await  DatabaseFactory.savePayloadToDatastore(requestPayloadRange)
                            if(saved){
                                let ip = req.connection.remoteAddress
                                let success = await server.addSession(ip)
                                if (success) {
                                    res.end(`Session ACCESS GRANTED on http://${host}:${port}`);
                                }
                                else {
                                    res.end(`Session ACCESS DENIED on http://${host}:${port} - No server available`);
                                }
                            }
                            else{
                                res.end(`Session ACCESS DENIED on http://${host}:${port} - request space of ${requestPayloadRange}MB is not available in datastore`);
                            }
                            
                            break
                    }

                }
            );
            httpserver.listen(port, host, () => {
                console.log(server)
            });

            // show servers and database status every 4 seconds
            setInterval(() => {
                this.showServersStatus()
                DatabaseFactory.showDatabasesStatus()
            }, 4000);

        }
    }

    showServersStatus() {
        function review(value, key, map) {
            let serverstatus = value.getStatus()
            console.log(serverstatus)
        }
        this.servers.forEach(review);
    }
}

