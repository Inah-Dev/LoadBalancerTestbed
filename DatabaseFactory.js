
import Database from "./Database.js"
import Utils from "./Util.js"

var databases = undefined
var configuration = undefined

export default class DatabaseFactory{

    static getDatabases(){
        return databases
    }

    static async createDatabases(configuration_){
        databases = new Map()
        configuration = configuration_

        for (let i = 0; i < configuration.NoDatastores; i++) {
            let storageRange = Utils.getRandomInt(configuration.MinDatastoreSpace, configuration.MaxDatastoreSpace)

            let database = new Database(`D${i}`,"general datastore",storageRange)
            databases.set(`D${i}`, database)
        }
    }

    static showDatabasesStatus() {
        function review(value, key, map) {
            let datbasestatus = value.getStatus()
            console.log(datbasestatus)
        }
        databases.forEach(review);
    }

    static async savePayloadToDatastore(payloadsize){
        return new Promise(async (resolve, reject) => {
            let saved = false
            for (let [key, database] of databases) {
                saved = database.addToDatabase(payloadsize)
                if(saved){
                    break
                }
            }
            resolve(saved)
        })        
    }

}