const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const mongoStore=require('connect-mongo');
// for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


// use express-ejs-layouts
app.use(expressLayouts);

app.use(express.urlencoded());



// use ejs
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'pcell',
    secret: 'psecret',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    },
    store: mongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/Placement_cell",
        autoRemove: 'disabled',
    },{function(err){
        console.log(err || 'mongo-connect setup ok');
    }
}),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);

//Use express routes
app.use('/',require('./routes'));
app.use(express.static('./assets'));

// extracting scripts and style 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.listen(port,function(err){
    if(err){
        return console.log(err,err);
    }
    return console.log("Server started:",port)
   
})