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
// Events TODO: Move event routes to separate file

// Seed events
router.get(     "/events/seed",         eventController.seedEvents )

// Show all events
router.get(     "/events",              eventController.showEvents )

// Create event
router.get(     "/events/create",       eventController.showCreate )
router.post(    "/events/",             eventController.processCreate )

// Show one event
router.get(     "/events/:event",       eventController.showEventDetails )

// Update event TODO: Change .post to .put using method override
router.get(     "/events/:event/edit",  eventController.showEdit )
router.post(    "/events/:event",       eventController.processEdit )

// Delete event
router.delete(  "/events/:event",      eventController.deleteEvent )




// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = router
