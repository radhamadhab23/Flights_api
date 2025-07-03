const express = require('express');
const {ServerConfig,logger}=require('./config');
const {AboutController, HomeController} = require('./controllers');
const apiRoutes = require('./routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',apiRoutes);
console.log('Registered /api route');

app.listen(ServerConfig.PORT,() =>{
    console.log(`Server is running on port ${ServerConfig.PORT}`);
           logger.info(`Server started on port ${ServerConfig.PORT}`,{});
})
