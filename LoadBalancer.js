import * as http from "http"
import crypto from "crypto"

import ServerFactory from "./ServerFactory.js"
import Utils from "./Util.js"
import RoundRobin from "./RoundRobin.js"
import LeastConnections from "./LeastConnections.js"
import ConsistentHashing from "./ConsistentHashing.js"

const host = '127.0.0.1'
const port = 8080

var configuration = undefined
var serverFactory = undefined
var loadBalancingAlgorithm = undefined


export default class LoadBalancer {

    constructor(configuration_) {
        configuration = configuration_

        if (Utils.getAlgorithm(configuration.LoadBalancingAlgorithm) === Utils.Algorithm.RoundRobin) {
            loadBalancingAlgorithm = new RoundRobin(configuration.NoServers)
        }
        else if (Utils.getAlgorithm(configuration.LoadBalancingAlgorithm)  === Utils.Algorithm.LeastConnections) {
            loadBalancingAlgorithm = new LeastConnections()
        }
        else if (Utils.getAlgorithm(configuration.LoadBalancingAlgorithm)  === Utils.Algorithm.ConsistentHashing) {
            loadBalancingAlgorithm = new ConsistentHashing(configuration.NoServers, configuration.Replicas)
        }

        let httpserver = http.createServer(
            async function (req, res) {
                res.setHeader("Content-Type", "application/json");
                switch (req.url) {
                    case "/":
                        res.writeHead(200);
                        res.end(`LoadBalancer is running on http://${host}:${port}/\n\nTo make a session request - http://${host}:${port}/[request]`);
                        break
                    default:
                        res.writeHead(200);

                        let serverindex = loadBalancingAlgorithm.getNext(req.url)
                        let nextInLineServer = serverFactory.getServerName(serverindex)

                        //route load to next legitimate server
                        http.get(`${nextInLineServer}/start`, resp => {
                            let data = ''
                            resp.on('data', chunk => {
                                data += chunk
                            })
                            resp.on('end', () => {
                                res.end(data);
                            })
                        })
                        break
                }
            }
        );
        httpserver.listen(port, host, () => {
            console.log(`LoadBalancer is running on http://${host}:${port}`)

            serverFactory = new ServerFactory()
            serverFactory.createServers(configuration)
        });

    }
}






