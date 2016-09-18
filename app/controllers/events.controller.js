"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const Event = require( "../models/event" )



// *****************************************************************************
// *****************************************************************************
// Controllers

// Show all events
function showEvents ( req, res ) {

  // Get all events
  Event.find({}, ( err, events ) => {

    if ( err ) {

      res.status( 404 )
      res.send( "Events not found" )


    } else {

      // Render view with data
      res.render( "pages/events", {
        events: events
      })


    }
  })
}


// Show a single event
function showEventDetails ( req, res ) {

  // Get data from request
  const eventSlug = req.params.event

  // Get a single event
  Event.findOne({ slug: eventSlug}, ( err, eventDetails ) => {

    if ( err ) {

      res.status( 404 )
      res.send( "Event not found" )


    } else {

      // Render view
      res.render( "pages/event", {
        eventDetails: eventDetails
      })


    }
  })
}


// Seed db with events
function seedEvents ( req, res ) {

  // Create events
  const events = [
    {
      name       : "Basketball",
      description: "Throwing stuff into a basket"
    },
    {
      name       : "Swimming",
      description: "Being wet and exhausted"
    },
    {
      name       : "Weightlifting",
      description: "Lifting heavy stuff"
    },
    {
      name       : "Soccer",
      description: "Running after a ball"
    },
    {
      name       : "Sharp shooting",
      description: "Hitting small targets with smaller bullets"
    },
  ]


  // Remove all events and insert above events to db
  Event.remove({}, () => {

    for ( const event of events ) {

      const newEvent = new Event( event )

      newEvent.save()

    }

  })


  // Seeded!
  res.send( "Seeding of events is complete!" )


}




// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  showEvents      : showEvents,
  showEventDetails: showEventDetails,
  seedEvents      : seedEvents
}


