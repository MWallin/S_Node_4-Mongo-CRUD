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
      res.render( "pages/events/events", {
        events : events,
        success: req.flash( "success" )
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
      res.render( "pages/events/event", {
        eventDetails: eventDetails,
        success     : req.flash( "success" )
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



// Show create new event form
function showCreate ( req, res ) {

  res.render( "pages/events/create", {
    errors: req.flash( "errors" )
  })

}




// Process new event and save to db
function processCreate ( req, res ) {

  // Validate incomming data
  req.checkBody( "name", "Name is required" ).notEmpty()
  req.checkBody( "description", "Description is required" ).notEmpty()

  // If data is invalid
  const errors = req.validationErrors()
  if ( errors ) {

    req.flash( "errors", errors.map( err => err.msg ) )

    return res.redirect( "/events/create" )

  }


  // Make a new event
  const event = new Event({

    name       : req.body.name,
    description: req.body.description

  })


  event.save( ( err, savedEvent ) => {

    if ( err ) {

      throw err

    } else {

      // Add flash message
      req.flash( "success", "Successfully created new event!" )

      res.redirect( `/events/${savedEvent.slug}` )


    }
  })
}


// Show edit event form
function showEdit ( req, res ) {

  // Get event from database
  Event.findOne({slug: req.params.event}, ( err, event ) => {

    if ( err ) {

      throw err

    } else {

      // Render form with data
      res.render( "pages/events/edit", {
        event : event,
        errors: req.flash( "errors" )
      })


    }
  })
}


// Process updates and save it
function processEdit ( req, res ) {

  // Validate incomming data
  req.checkBody( "name", "Name is required" ).notEmpty()
  req.checkBody( "description", "Description is required" ).notEmpty()

  // If data is invalid
  const errors = req.validationErrors()
  if ( errors ) {

    req.flash( "errors", errors.map( err => err.msg ) )

    return res.redirect( `/events/${req.params.event}/edit` )

  }


  // Find current event
  Event.findOne({ slug: req.params.event}, ( err, event ) => {

    // Update event
    event.name = req.body.name
    event.description = req.body.description

    event.save( ( err ) => {
      if ( err ) {

        throw err

      }

      // Add flash message
      req.flash( "success", "Successfully updated event" )

      // Redirect
      res.redirect( "/events" )


    })
  })
}


function deleteEvent ( req, res ) {

  // Remove event
  Event.remove({ slug: req.params.event}, ( err ) => {

    if ( err ) {

      throw err

    } else {

      // Set flash data
      req.flash( "success", "Successfully removed event!" )

      // Redirect back to events page
      res.redirect( "/events" )


    }
  })
}


// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  seedEvents      : seedEvents,
  showEvents      : showEvents,
  showEventDetails: showEventDetails,
  showCreate      : showCreate,
  processCreate   : processCreate,
  showEdit        : showEdit,
  processEdit     : processEdit,
  deleteEvent     : deleteEvent
}


