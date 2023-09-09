const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;


app.get('/api', (req,res)=>{
    const {slack_name,track} = req.query;


    // Get current day and UTC time
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString('en-US',{weekday: 'long'});
    const utcTime = currentDate.toISOString().slice(0, -5) + 'Z';
    

    //Construct the JSON response 
    const response = {
        slack_name,
        current_day: currentDay,
        utc_time: utcTime,
        track,
        github_file_url: 'https://github.com/Madh-dev/zuri/blob/master/stage%201/index.js', // Replace with your file URL
        github_repo_url: 'https://github.com/Madh-dev/zuri/tree/master/stage%201', // Replace with your repository URL
    
        status_code:200,
    };
    res.json(response)
});

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})