export default class Database{
    constructor(id,name,storagemax){
        this.name = name
        this.id = id
        this.storagemax = storagemax
        this.storageleft = storagemax
    }

    getSpaceleft(){
        return this.storageleft
    }

    addToDatabase(payloadsize){
        if((this.storageleft - payloadsize) >0){
            this.storageleft = this.storageleft - payloadsize
            return true
        }
        else{
            return false
        }
    }

    getStatus(){
        return {
            "id":this.id,
            "Name":`${this.name}`,
            "MaxStorage":`${this.storagemax}`,
            "StorageLeft":`${this.storageleft}`
        }
    }
}