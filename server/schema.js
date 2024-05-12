
// This schema is being use one-to-one relationship with embedded documents in the server code 
// as all the user information is stored within a single document in the database. 
// the schema has to be exact to the data being parsed

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

   fName: {
     type: String,
     required: true   
    },

   lName: {
    type: String,
    required: true   
   },

   username: {
    type: String,
    unique: true,
    required: true   
   },

   pass: {
    type: String,
    required: true   
   },

   email: {
    type: String,
    unique: true,
    required: true   
   },
   
   favorites: [{ type: mongoose.Schema.Types.Mixed }], // stores different data types in the mongo db corresponding property array
   // favorites: [String] 



})

const User = mongoose.model('User', userSchema);

export default User;

