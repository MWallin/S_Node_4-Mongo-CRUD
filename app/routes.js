"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

// Externals
const express = require( "express" )

// Own
const mainController = require( "./controllers/main.controller" )
const eventController = require( "./controllers/events.controller" )

// Setup
const router = express.Router()



// *****************************************************************************
// *****************************************************************************
// Routing

// =============================================================================
// Home route
router.get( "/", mainController.showHome )


// =============================================================================
// Events
router.get( "/events",        eventController.showEvents )

router.get( "/events/:event", eventController.showEventDetails )



// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = router
