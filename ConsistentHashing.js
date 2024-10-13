export default class ConsistentHashing {
    constructor(noservers_, replicas_) {
        this.noservers = noservers_
        this.replicas = replicas_
        this.hashmap = new Map()
      
        for (let i = 0; i < this.replicas; i++) {// replica
            for (let j = 0; j < this.noservers; j++) {

                let server_hash = crypto.createHash('md5').update(`__S${j}${i}`).digest('hex');
                this.hashmap.set(`__S${j}${i}`,server_hash)
            }
        }
    }

    addClient(requestid){
        if(!this.hashmap.has(requestid)){
            let request_hash = crypto.createHash('md5').update(requestid).digest('hex');
            this.hashmap.set(requestid,request_hash)
        }        
    }

    removeNode(nodeid){
        this.hashmap.delete(nodeid)
    }

    getNext(requestid){
        this.addClient(requestid)

        let serverid = undefined
        //sort by hashkeys
        const hashmap_sorted = new Map([...this.hashmap.entries()].sort((a, b) => a[1].localeCompare(b[1])));
        
        let rfound = false
        for (let [key, value] of hashmap_sorted) {
            if(key === requestid){
                rfound = true
            }

            if(rfound){
                if(key.startsWith("__S")){
                    serverid = removeN(key,2)
                    if(this.noservers < 10){
                        serverid = serverid.substring(0, 2);
                    }
                    else if(this.noservers <100){
                        serverid = serverid.substring(0, 3);
                    }
                    else if(this.noservers <1000){
                        serverid = serverid.substring(0, 4);
                    }//max of 999 servers

                    break
                }
            }
        }

        return serverid
    }

}

//util functions
const removeN = (str, num) => {
    const { length } = str;
    if(num > length){
       return str;
    };
    const newStr = str.substr(num, length - num);
    return newStr;
 };