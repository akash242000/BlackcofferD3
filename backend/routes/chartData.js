const express = require('express');
const router = express.Router();
const Data= require('../models/data')


router.get('/getCountryInfo/:countryName', async function(req, res){
    const country = req.params.countryName

    try{
        let countryData= await Data.find({country:country}).exec();

        let intensityAverage = countryData.reduce((acc, curr)=>{
            if(curr.intensity){
                return acc+ parseInt(curr.intensity)
            }
            return acc
        },0)

        let likhoodAverage = countryData.reduce((acc, curr)=>{
            if(curr.likelihood){
                return acc+ parseFloat(curr.likelihood).toFixed(2)
            }
            return acc
        },0)

        let relevanceAverage= countryData.reduce((acc, curr)=>{
            if(curr.relevance){
                return acc+ parseInt(curr.relevance)
            }
            return acc
        },0)

        console.log(intensityAverage,likhoodAverage)
        const data={
            country:country,
            intensity:Math.round(intensityAverage/countryData.length),
            likelihood:Math.round(likhoodAverage/countryData.length),
            relevance:(relevanceAverage/countryData.length)
        }

        res.json(data)

    }catch(error){
        console.log(error)
    }

})


router.get('/getCountryInfoAll', async function(req, res){
    const countries =['China','United States of America','Russia','India','Mexico', 'Japan']

    try{
        const info=await Promise.all(countries.map(async(country)=>{
                let countryData= await Data.find({country:country});

                let intensityAverage = countryData.reduce((acc, curr)=>{
                    if(curr.intensity){
                        return acc+ parseInt(curr.intensity)
                    }
                    return acc
                },0)
        
                let likhoodAverage = countryData.reduce((acc, curr)=>{
                    if(curr.likelihood){
                        return acc+ parseInt(curr.likelihood)
                    }
                    return acc
                },0)
        
                let relevanceAverage= countryData.reduce((acc, curr)=>{
                    if(curr.relevance){
                        return acc+ parseInt(curr.relevance)
                    }
                    return acc
                },0)
        
        
        
                const data={
                    country:country,
                    intensity:Math.round(intensityAverage/countryData.length),
                    likelihood:(likhoodAverage/countryData.length).toFixed(2),
                    relevance:(relevanceAverage/countryData.length).toFixed(2)
                }

                return  data;
            }))

        res.json(info)

    }catch(error){
        console.log(error)
    }

})


router.get('/countryTopics/:topic', async function(req, res){
    const topic = req.params.topic;
    const countries =['China','United States of America','Russia','India','Mexico', 'Japan']

    const topicData = await Data.find({topic:topic}).select('topic country');

    const data=countries.map((country)=>{
        
        const frequency =topicData.reduce((acc, curr)=>{
            if(curr.country===country){
                return acc+1;
            }
            return acc
        },0)

        const data={
            country:country,
            frequency
        }
        return data;

    })

    res.json(data)

})

router.get('/countrySectors/:sector', async function(req, res){
    const sector = req.params.sector;
    const countries =['China','United States of America','Russia','India','Mexico', 'Japan']

    const sectorData = await Data.find({sector:sector}).select('sector country');

    const data=countries.map((country)=>{
        
        const frequency =sectorData.reduce((acc, curr)=>{
            if(curr.country===country){
                return acc+1;
            }
            return acc
        },0)

        const data={
            country:country,
            frequency
        }
        return data;

    })

    res.json(data)

})


router.get('/yearData', async function(req, res){

    const years=[2016,2017,2018,2019,2020,2021,2022,2024,2025,2026,2027,2028,2030,2034,2035,2036,2040,2041,2046,2050,2051,2055,2060,2126,2200]


    const sectors=["Energy", "Manufacturing", "Retail", "Financial services", "Government", "" ]

    function getFrequency(data,key){   
        let freq={}
        for(let i=0; i<data.length; i++){
            if(freq[data[i][key]]){
                freq[data[i][key]]+=1
            }else{
                freq[data[i][key]]=1
            }
        }
        
        return freq;
    }


    const data= await Promise.all(years.map(async (year)=>{
        const yearData= await Data.find({end_year:year}).select('end_year sector topic country pestle');

        return yearComposedData={
            endyear:year,
            sector:getFrequency(yearData,'sector'),
            topic:getFrequency(yearData,'topic'),
            country:getFrequency(yearData,'country'),
            pestle:getFrequency(yearData,'pestle')
        }

    })
    )

    res.json(data)
})



module.exports= router;