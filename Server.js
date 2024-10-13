export default class Server {
    constructor(id, name, maxSessions, processTime) {
        this.name = name
        this.id = id
        this.maxSessions = maxSessions
        this.processTime = processTime
        this.sessions = []

        setInterval(() => {
            this.maintainSessions()
        }, 2000);
    }

    getSessions() {
        return this.sessions
    }

    getNoSessions() {
        return this.sessions.length
    }

    limitReached() {
        if (this.getNoSessions() >= this.maxSessions) {
            return true
        }
        else {
            return false
        }
    }

    async addSession(ipaddress){
        return new Promise(async (resolve, reject) => {
            if(this.sessions.length <= this.maxSessions){
                let session = new Session(ipaddress, this.processTime)
                this.sessions.push(session)
    
                resolve(true)
            }
            else{
                resolve(false)
            } 
        })              
    }

    maintainSessions(){
        var toremove = new Array()
        for(var i=0;i<this.sessions.length;i++){
            if(this.sessions[i].state === state.inactive){
                this.sessions[i].startSession()
            }
            else if(this.sessions[i].state === state.finished || this.sessions[i].state === undefined){
                toremove.push(i)
            }
        }
        for(var i=0;i<toremove.length;i++){
            let rindex = toremove[i]
            this.sessions.splice(rindex, 1)
        }
    }

    getStatus(){
        return {
            "id":this.id,
            "Server":`${this.name}`,
            "MaxSessions":`${this.maxSessions}`,
            "processTime":`${this.processTime}`,
            "Active":this.getNoSessions(),
            "limitReached": `${this.limitReached()}`
        }
    }
}

class Session {
    constructor(ipaddress, duration) {
        this.ipaddress = ipaddress
        this.state = state.inactive
        this.duration = duration
    }

    startSession() {
        this.state = state.active

        this.timed = setTimeout(() => {
            this.state = this.endSession()
        }, this.duration);
    }

    endSession(){
        this.state = state.finished
    }
}

const state = {
	active: "active",
	inactive: "inactive",
	finished: "finished"
}
