const express=require('express');
const path=require('path');
const app=express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// js path

app.use('/js', express.static(path.join(__dirname, "./js")));

// css path

app.use('/assets', express.static(path.join(__dirname, "./assets")));

// Bodyparser
app.use(express.urlencoded({extended:false}));

// Routes
app.use('/',require('./routes/login'));

// port
const PORT=process.env.PORT||3001;

app.listen(PORT,console.log(`Server started on ${PORT}`));

