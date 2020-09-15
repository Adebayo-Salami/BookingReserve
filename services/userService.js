const dbTables = require("../tables");
var MongoClient = require("mongodb").MongoClient;
const userObject = require("../models/user");
const responseObject = require("../models/response");

exports.RegisterUser = function (
  lastName,
  firstName,
  phoneNumber,
  emailAddress,
  password
) {
  //Perform Null Checks
  if (firstName == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "First Name Is Required";
    return responseObject;
  }

  if (lastName == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Last Name Is Required";
    return responseObject;
  }

  if (password == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Password Is Required";
    return responseObject;
  }

  if (emailAddress == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Email Address Is Required";
    return responseObject;
  }

  if (phoneNumber == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Phone Number Is Required";
    return responseObject;
  }

  //Create User Object
  userObject.FirstName = firstName;
  userObject.LastName = lastName;
  userObject.PhoneNumber = phoneNumber;
  userObject.EmailAddress = emailAddress;
  userObject.Password = password;

  //Save To Database
  MongoClient.connect(dbTables.Endpoint, (err, db) => {
    if (err) {
      responseObject.IsSuccessful = false;
      responseObject.ErrorMessage = err.message;
      return responseObject;
    }

    var uchatDB = db.db(dbTables.DatabaseName);
    uchatDB
      .collection(dbTables.UserTable)
      .insertOne(userObject, (insertErr, data) => {
        if (insertErr) {
          responseObject.IsSuccessful = false;
          responseObject.ErrorMessage = insertErr.message;
          return responseObject;
        }

        responseObject.IsSuccessful = true;
        responseObject.ErrorMessage = "Registeration Successful!";
        return responseObject;
      });
  });
};

exports.LoginUser = function (emailAddress, password) {
  //Perform Null Checks
  if (emailAddress == null || password == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Incomplete Credentials Passed.";
    return responseObject;
  }

  //Connect To The Database Server
  MongoClient.connect(dbTables.Endpoint, (err, db) => {
    if (err) {
      responseObject.IsSuccessful = false;
      responseObject.ErrorMessage = err.message;
      return responseObject;
    }
    var uchatDB = db.db(dbTables.DatabaseName);
    uchatDB.collection(dbTables.UserTable).findOne(userObject, (err, data) => {
      if (err) {
        responseObject.IsSuccessful = false;
        responseObject.ErrorMessage = err.message;
        return responseObject;
      }

      if (data == null) {
        responseObject.IsSuccessful = false;
        responseObject.ErrorMessage = "User does not exist";
        return responseObject;
      }

      responseObject.IsSuccessful = true;
      responseObject.ErrorMessage = "Authentication Successful";
      responseObject.ResponseObject = data;
      return responseObject;
    });
  });
};
