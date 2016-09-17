"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

// *****************************************************************************
// *****************************************************************************
// Controllers

// Show all events
function showEvents ( req, res ) {

  // Create dummy data
  const events = [
    {
      name       : "Basketball",
      slug       : "basketball",
      description: "Throwing stuff into a basket"
    },
    {
      name       : "Swimming",
      slug       : "swimming",
      description: "Being wet and exhausted"
    },
    {
      name       : "Weightlifting",
      slug       : "weightlifting",
      description: "Lifting heavy stuff"
    },
    {
      name       : "Soccer",
      slug       : "soccer",
      description: "Running after a ball"
    },
  ]


  // Render view with data
  res.render( "pages/events", {
    events: events
  })

}



// Show a single event
function showEventDetails ( req, res ) {

  // Get a single event
  const eventDetails =
    {
      name       : "Basketball",
      slug       : "basketball",
      description: "Throwing stuff into a basket"
    }


  // Render view
  res.render( "pages/event", {
    eventDetails: eventDetails
  })


}

// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  showEvents      : showEvents,
  showEventDetails: showEventDetails
}


