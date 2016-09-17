"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires

// Externals
const ejsLayouts = require( "express-ejs-layouts" )
const express    = require( "express" )
const path       = require( "path" )

// Constants
const port = process.env.PORT || 3000



// *****************************************************************************
// *****************************************************************************
// App setup

const app = express()

// Serve static content: css, js
app.use( express.static( path.join( __dirname, "/public" ) ) )

// Use EJS with layouts
app.set( "view engine", "ejs" )
app.use( ejsLayouts )



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
