import data from "../../backend/models/data"

export default function findAverage(data, value){
    return data.reduce((acc, curr)=>{
        return acc+ curr[value]
    },0)
}