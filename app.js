const express=require('express');
const path=require('path');
const app=express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({extended:false}));

// Routes
app.use('/',require('./routes/index'));

// port
const PORT=process.env.PORT||3001;

app.listen(PORT,console.log(`Server started on ${PORT}`));

