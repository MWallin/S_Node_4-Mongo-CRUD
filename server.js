"use strict"


// *****************************************************************************
// *****************************************************************************
// Load environment variables

require( "dotenv-safe" ).load();



// *****************************************************************************
// *****************************************************************************
// Requires

// Externals
const express          = require( "express" )
const path             = require( "path" )
const ejsLayouts       = require( "express-ejs-layouts" )
const bodyParser       = require( "body-parser" )
const mongoose         = require( "mongoose" )
const session          = require( "express-session" )
const cookieParser     = require( "cookie-parser" )
const flash            = require( "connect-flash" )
const expressValidator = require( "express-validator" )
const methodOverride   = require( "method-override" )

// Constants
const port = process.env.PORT || 3000



// *****************************************************************************
// *****************************************************************************
// App setup

const app = express()

// Configure sessions and cookie parser
app.use( cookieParser() )

app.use( session({

  secret           : process.env.SECRET,
  cookie           : { maxAge: 60000},
  resave           : false,   // Forces the session to be saved back to the store
  saveUninitialized: false    // Don't save unmodified

}) )

app.use( flash() )


// Serve static content: css, js
app.use( express.static( path.join( __dirname, "/public" ) ) )


// Use EJS with layouts
app.set( "view engine", "ejs" )

app.use( ejsLayouts )


// Override posts having ?_method=DELETE for RESTful compliance
app.use( methodOverride( "_method" ) )


// Use body-parser to handle form data & expressValidator
app.use( bodyParser.urlencoded({ extended: true}) )

app.use( expressValidator() )


// *****************************************************************************
// *****************************************************************************
// Routing

mongoose.connect( process.env.DB_URI )


// *****************************************************************************
// *****************************************************************************
// Routing

app.use( require( path.join( __dirname, "app/routes" ) ) )



// *****************************************************************************
// *****************************************************************************
// Start server

app.listen( port, () => {

  console.log( `Server is listening on http://localhost:${port}` )

})
