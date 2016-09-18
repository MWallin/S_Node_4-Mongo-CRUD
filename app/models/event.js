"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )
const Schema = mongoose.Schema



// *****************************************************************************
// *****************************************************************************
// Middleware definition

function slugify( text ) {
  return text.toString().toLowerCase()
    .replace( /\s+/g, "-" )           // Replace spaces with -
    .replace( /[^\w\-]+/g, "" )       // Remove all non-word chars
    .replace( /\-\-+/g, "-" )         // Replace multiple - with single -
    .replace( /^-+/, "" )             // Trim - from start of text
    .replace( /-+$/, "" );            // Trim - from end of text
}



// *****************************************************************************
// *****************************************************************************
// Schema definition

const evenctSchema = new Schema({
  name: String,
  slug: {
    type  : String,
    unique: true
  },
  description: String
})



// *****************************************************************************
// *****************************************************************************
// Middleware attachtment

// Make sure that a slug is created from the name on save
evenctSchema.pre( "save", function( next ) {

  this.slug = slugify( this.name )

  next()

})



// *****************************************************************************
// *****************************************************************************
// Model definition

const eventModel = mongoose.model( "Event", evenctSchema )



// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = eventModel
