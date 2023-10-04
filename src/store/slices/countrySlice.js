const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState={
    countryData:[],
    topicData:[],
    sectorData:[],
    yearData:[],
    status:'loading',
    topicStatus:'loading',
}

const URL=process.env.REACT_APP_URL;


export const getCountryData = createAsyncThunk('countryData/getCountryData', async(countryName)=>{
    try {
        const response= await fetch(`${URL}charts/getCountryInfo/${countryName}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
        })

        const data= await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const getCountryDataAll = createAsyncThunk('countryData/getCountryDataAll', async()=>{
    try {
        const response= await fetch(`${URL}charts/getCountryInfoAll`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
        })

        const data= await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const getCountryTopicData = createAsyncThunk('countryData/getCountryTopicData', async(topic)=>{
    try {
        const response= await fetch(`${URL}charts/countryTopics/${topic}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
        })

        const data= await response.json();
        return data;
    } catch (error) {
        
    }
})

export const getCountrySectorData = createAsyncThunk('countryData/getCountrySectorData', async(sector)=>{
    try {
        const response= await fetch(`${URL}charts/countrySectors/${sector}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
        })

        const data= await response.json();
        return data;
    } catch (error) {
        
    }
})



export const getYearData= createAsyncThunk('countryData/getYearData', async()=>{
    try {
        const response= await fetch(`${URL}charts/yearData`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
        })

        const data= await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
})

const countrySlice= createSlice({
    name:'countryData',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCountryData.fulfilled,(state, action)=>{
            state.countryData= action.payload;
        })
        .addCase(getCountryDataAll.fulfilled, (state, action)=>{
            state.countryData= action.payload;
        })

        .addCase(getCountryTopicData.fulfilled, (state, action)=>{
            state.topicData=action.payload;
            state.topicStatus='done'
        })

        .addCase(getCountryTopicData.pending, (state, action)=>{
            state.topicStatus='loading'
        })

        .addCase(getCountrySectorData.fulfilled, (state,action)=>{
            state.sectorData=action.payload
        })

        .addCase(getYearData.fulfilled, (state, action)=>{
            state.yearData=action.payload;
            state.status='done'
        })

        .addCase(getYearData.pending, (state, action)=>{
            state.status='loading'
        })
    }

})

export const getIntensity=(state)=>state.countryData.countryData.map((data)=>{
    return {label:data.country,value:data.intensity}
})

export const getRelevance=(state)=>state.countryData.countryData.map((data)=>{
    return {label:data.country,value:parseFloat(data.relevance)}
})

export const getLikelihood=(state)=>state.countryData.countryData.map((data)=>{
    return {label:data.country,value:parseFloat(data.likelihood)}
})

export const topicData= (state)=> state.countryData.topicData;
export const topicDataStatus= (state)=> state.countryData.topicStatus;

export const sectorData= (state) => state.countryData.sectorData;

export const getAllYearData=(state)=> state.countryData.yearData;
export const getAllYearDataStatus=(state)=> state.countryData.status;

export default countrySlice.reducer;