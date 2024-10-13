
import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';

import LoadBalancer from "./LoadBalancer.js"
import Utils from './Util.js';

var config = undefined
const rl = readline.createInterface({ input, output });

async function main() {

    config = {
        LoadBalancingAlgorithm: Utils.AlgorithmStr[1],
        NoServers: 2,
        Replicas: 3,
        MaxNoSessionsPerServer: 10,
        MinNoSessionsPerServer: 1,
        MaxProcessingTime: 30000, //30 seconds
        MinProcessingTime: 2000, //2 seconds
        NoDatastores: 2,
        MaxDatastoreSpace: 1000000, //1GB
        MinDatastoreSpace: 100000, //100MB
        MaxSizeRequestPayload: 100000, //100MB
        MinSizeRequestPayload: 1000, //1MB
    }

    prompt()
    async function prompt() {
        console.log(Utils.getConfigurationStr(config))
        let info = `[index] - To change configuration\nY - To execute\nN - To exit\n`
        let command = await rl.question(info);
        command = command.toUpperCase()

        switch (command) {
            case "Y":
                new LoadBalancer(config)
                break
            case "1":
                await changeLoadBalancingAlgorithm()
                prompt()
                break
            case "2":
                await changeNoServers()
                prompt()
                break
            case "3":
                await changeNoReplicas()
                prompt()
                break
            case "4":
                await changeMaxNoSessionsPerServer()
                prompt()
                break
            case "5":
                await changeMinNoSessionsPerServer()
                prompt()
                break
            case "6":
                await changeMaxProcessingTime()
                prompt()
                break
            case "7":
                await changeMinProcessingTime()
                prompt()
                break
            case "8":
                await changeNoDatastores()
                prompt()
                break
            case "9":
                await changeMaxDatastoreSpace()
                prompt()
                break
            case "10":
                await changeMinDatastoreSpace()
                prompt()
                break
            case "11":
                await changeMaxSizeRequestPayload()
                prompt()
                break
            case "12":
                await changeMinSizeRequestPayload()
                prompt()
                break
            default:
                prompt()
                break
        }
    }

}


async function changeLoadBalancingAlgorithm() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "Load-balancing algorithm:\n(1) RoundRobin\n(2) LeastConnections or\n(3) ConsistentHashing\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 4) {
                config.LoadBalancingAlgorithm = Utils.AlgorithmStr[Number(input)]
                changed = true
            }
        }
        resolve(changed)
    })

}

async function changeNoServers() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "numberOfServers:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 1000) { //max no servers  = 999
                config.NoServers = Number(input)
                changed = true
            }
        }
        resolve(changed)
    })

}

async function changeNoReplicas() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "Replicas:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) <= 100) { //max no replicas  = 100
                config.Replicas = Number(input)
                changed = true
            }
        }
        resolve(changed)
    })

}

async function changeMaxNoSessionsPerServer() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MaxNoSessionsPerServer (<=999):\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 100) { //max no server sessions  = 100
                if (Number(input) >= config.MinNoSessionsPerServer) {
                    config.MaxNoSessionsPerServer = Number(input)
                    changed = true
                }
            }
        }
        resolve(changed)
    })
}

async function changeMinNoSessionsPerServer() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MinNoSessionsPerServer (>=1):\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) <= 100) { //min no server sessions  = 100
                if (Number(input) <= config.MaxNoSessionsPerServer) {
                    config.MinNoSessionsPerServer = Number(input)
                    changed = true
                }
            }
        }
        resolve(changed)
    })
}

async function changeMaxProcessingTime() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MaxProcessingTime (1 sec = 1000):\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 30000) { //max server no processing time  = 30 sec
                if (Number(input) >= config.MinProcessingTime) {
                    config.MaxProcessingTime = Number(input)
                    changed = true
                }
            }
        }
        resolve(changed)
    })
}


async function changeMinProcessingTime() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MinProcessingTime:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 30000) { //min server no processing time  = 30 sec
                if (Number(input) <= config.MaxProcessingTime) {
                    config.MinProcessingTime = Number(input)
                    changed = true
                }
            }
        }
        resolve(changed)
    })
}

async function changeNoDatastores() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "NoDatastores:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 1000) { //min no sessions  = 999
                config.NoDatastores = Number(input)
                changed = true
            }
        }
        resolve(changed)
    })
}

async function changeMaxDatastoreSpace() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MaxDatastoreSpace:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) <= 1000000) { //max storage space 1GB 
                if (Number(input) >= config.MinDatastoreSpace) {
                    config.MaxDatastoreSpace = Number(input)
                    changed = true
                }                
            }
        }
        resolve(changed)
    })
}

async function changeMinDatastoreSpace() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MinDatastoreSpace:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 1000000) { //min storage space 1GB 
                if (Number(input) <= config.MaxDatastoreSpace) {
                    config.MinDatastoreSpace = Number(input)
                    changed = true
                }                
            }
        }
        resolve(changed)
    })
}

async function changeMaxSizeRequestPayload() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MaxSizeRequestPayload:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 100000) { //max size of request payload 100MB
                if (Number(input) >= config.MinSizeRequestPayload) {
                    config.MaxSizeRequestPayload = Number(input)
                    changed = true
                }                
            }
        }
        resolve(changed)
    })
}

async function changeMinSizeRequestPayload() {

    return new Promise(async (resolve, reject) => {
        let changed = false
        let info = "MinSizeRequestPayload:\n"
        let input = await rl.question(info);

        if (Utils.isNumeric(input)) {
            if (Number(input) > 0 && Number(input) < 1000) { //min size of request payload 100MB
                if (Number(input) <= config.MaxSizeRequestPayload) {
                    config.MinSizeRequestPayload = Number(input)
                    changed = true
                }                
            }
        }
        resolve(changed)
    })
}


main()