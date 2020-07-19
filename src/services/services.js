import axios from 'axios';

export default {
    URL:"http://localhost:3001/api/",
    GREETING:"greeting",
    MESSAGE:"messages",
    getGreeting(){
       const config = {
        url: `${this.URL}${this.GREETING}`,
        method:"GET",
        header:{
            "Content-Type":"application/json"
        }
        }
       return axios(config)
        .then(res=>res)
        .catch(err=>err)
    },
    postMessage(data){
        const config = {
            url: `${this.URL}${this.MESSAGE}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.message)
        }
        return axios(config)
        .then(res=>res)
        .catch(err=>err)
    }
}