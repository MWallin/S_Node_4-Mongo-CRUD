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

// Seed events
router.get( "/events/seed", eventController.seedEvents )


// Show all events
router.get( "/events",        eventController.showEvents )

// Show one event
router.get( "/events/:event", eventController.showEventDetails )

// TODO: Create event
// TODO: Update event
// TODO: Delete event





// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = router
