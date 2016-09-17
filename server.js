"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires

// Externals
const express = require( "express" )
const path    = require( "path" )

// Constants
const port = process.env.PORT || 3000



// *****************************************************************************
// *****************************************************************************
// App setup

const app = express()



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