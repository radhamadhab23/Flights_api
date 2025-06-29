const express = require('express');
const {ServerConfig,logger}=require('./config');
const {AboutController, HomeController} = require('./controllers');
const apiRoutes = require('./routes');
const app = express();
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,() =>{
    console.log(`Server is running on port ${ServerConfig.PORT}`);
           logger.info(`Server started on port ${ServerConfig.PORT}`,{});
})