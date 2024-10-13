
export default class Utils {

    //util functions
    static getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    static isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

    static Algorithm = { RoundRobin: 1, LeastConnections: 2, ConsistentHashing: 3 }; //vanilla object
    static AlgorithmStr = { 1: "RoundRobin", 2: "LeastConnections", 3: "ConsistentHashing" }; //vanilla object

    static getAlgorithm(algStr){
        let algno = undefined
        switch(algStr){
            case Utils.AlgorithmStr[1]:
                algno = Utils.Algorithm.RoundRobin
                break
            case Utils.AlgorithmStr[2]:
                algno = Utils.Algorithm.LeastConnections
                break
            case Utils.AlgorithmStr[3]:
                algno = Utils.Algorithm.ConsistentHashing
                break
        }
        return algno
    }

    static ConfigTemplate = { 
        LoadBalancingAlgorithm: 1, 
        NoServers: 2, 
        Replicas: 3,
        MaxNoSessionsPerServer:4,
        MinNoSessionsPerServer:5,
        MaxProcessingTime:6,
        MinProcessingTime:7,
        NoDatastores:8,
        MaxDatastoreSpace:9,
        MinDatastoreSpace:10,
        MaxSizeRequestPayload:11,
        MinSizeRequestPayload:12
    }; 
    static ConfigTemplateStr = {
        1: "LoadBalancingAlgorithm", 
        2: "NoServers", 
        3: "Replicas",
        4: "MaxNoSessionsPerServer",
        5: "MinNoSessionsPerServer",
        6: "MaxProcessingTime",
        7: "MinProcessingTime",
        8: "NoDatastores",
        9: "MaxDatastoreSpace",
        10: "MinDatastoreSpace",
        11: "MaxSizeRequestPayload",
        12: "MinSizeRequestPayload"
    }

    static getConfigurationStr(configuration){
        return `
1 LoadBalancingAlgorithm = ${configuration.LoadBalancingAlgorithm},
2 NoServers = ${configuration.NoServers},
3 Replicas = ${configuration.Replicas},
4 MaxNoSessionsPerServer = ${configuration.MaxNoSessionsPerServer},
5 MinNoSessionsPerServer = ${configuration.MinNoSessionsPerServer},
6 MaxProcessingTime = ${configuration.MaxProcessingTime},
7 MinProcessingTime = ${configuration.MinProcessingTime},
8 NoDatastores = ${configuration.NoDatastores},
9 MaxDatastoreSpace = ${configuration.MaxDatastoreSpace},
10 MinDatastoreSpace = ${configuration.MinDatastoreSpace},
11 MaxSizeRequestPayload = ${configuration.MaxSizeRequestPayload},
12 MinSizeRequestPayload = ${configuration.MinSizeRequestPayload}
`
    }
     

}
