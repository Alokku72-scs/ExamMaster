const express = require("express");
const app =express();
const cors = require('cors');
app.use(cors());


require('dotenv').config();
const PORT = process.env.PORT || 4000

app.use(express.json());

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
//const questionRoutes = require("./routes/QuestionRoutes");
const examRoutes = require("./routes/ExamRoutes");

app.use("/api/v1",user);
//app.use("/api/v1", questionRoutes); 
app.use("/api/v1", examRoutes);

//activate
app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
});

