const dbTables = require("../tables");
var MongoClient = require("mongodb").MongoClient;
const userObject = require("../models/user");
const responseObject = require("../models/response");

exports.RegisterUser = async function (
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

  //Check If Any User with the same email address exists, then to save to database
  const client = await MongoClient.connect(dbTables.Endpoint, {
    useNewUrlParser: true,
  }).catch((err) => {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  });

  if (!client) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Could not connect!";
    return responseObject;
  }

  try {
    const db = client.db(dbTables.DatabaseName);
    let userCollection = db.collection(dbTables.UserTable);

    //Check IF User Exists
    let checkUserExistsQuery = { EmailAddress: userObject.EmailAddress };
    let respcheckUserExists = await userCollection.findOne(
      checkUserExistsQuery
    );

    if (respcheckUserExists == null) {
      //Add user record to db
      let respAddUser = await userCollection.insertOne(userObject);
      if (respAddUser.insertedCount == 1) {
        responseObject.IsSuccessful = true;
        responseObject.ErrorMessage = "Registration Successful!";
        return responseObject;
      } else {
        responseObject.IsSuccessful = false;
        responseObject.ErrorMessage = "Registration Failed, Pls try again!";
        return responseObject;
      }
    } else {
      responseObject.IsSuccessful = true;
      responseObject.ErrorMessage = "User with this email already exists.";
      return responseObject;
    }
  } catch (err) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  } finally {
    client.close();
  }
};

exports.LoginUser = async function (emailAddress, password) {
  //Perform Null Checks
  if (emailAddress == null || password == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Incomplete Credentials Passed.";
    return responseObject;
  }

  //Connect To The Database Server
  const client = await MongoClient.connect(dbTables.Endpoint, {
    useNewUrlParser: true,
  }).catch((err) => {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  });

  if (!client) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Could not connect!";
    return responseObject;
  }

  try {
    const db = client.db(dbTables.DatabaseName);
    let userCollection = db.collection(dbTables.UserTable);

    //Check IF User Exists
    let checkUserExistsQuery = {
      EmailAddress: emailAddress,
      Password: password,
    };
    let respcheckUserExists = await userCollection.findOne(
      checkUserExistsQuery
    );
    if (respcheckUserExists != null) {
      responseObject.IsSuccessful = true;
      responseObject.ErrorMessage = "Login Successful!";
      responseObject.ResponseObject = respcheckUserExists;
      return responseObject;
    } else {
      responseObject.IsSuccessful = false;
      responseObject.ErrorMessage = "No User with this credential exists!";
      return responseObject;
    }
  } catch (err) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  } finally {
    client.close();
  }
};

exports.GetUserTickets = async function (userId) {
  if (userId == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "User ID Is Required.";
    return responseObject;
  }

  const client = await MongoClient.connect(dbTables.Endpoint, {
    useNewUrlParser: true,
  }).catch((err) => {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  });

  if (!client) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Could not connect!";
    return responseObject;
  }

  try {
    const db = client.db(dbTables.DatabaseName);
    let ticketCollection = db.collection(dbTables.TicketTable);

    let checkUserTicketsQuery = {
      UserID: userId,
    };
    let respcheckUserTickets = await ticketCollection
      .find(checkUserTicketsQuery)
      .toArray();

    responseObject.IsSuccessful = true;
    responseObject.ErrorMessage = "Success!";
    responseObject.ResponseObject = respcheckUserTickets;
    return responseObject;
  } catch (err) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  } finally {
    client.close();
  }
};

exports.GetUserTicketsForEvent = async function (userId, eventId) {
  if (userId == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "User ID Is Required.";
    return responseObject;
  }
  if (eventId == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Event ID Is Required.";
    return responseObject;
  }

  const client = await MongoClient.connect(dbTables.Endpoint, {
    useNewUrlParser: true,
  }).catch((err) => {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  });

  if (!client) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Could not connect!";
    return responseObject;
  }

  try {
    const db = client.db(dbTables.DatabaseName);
    let ticketCollection = db.collection(dbTables.TicketTable);

    let checkUserTicketsQuery = {
      UserID: userId,
      EventID: eventId,
    };
    let respcheckUserTickets = await ticketCollection
      .find(checkUserTicketsQuery)
      .toArray();

    responseObject.IsSuccessful = true;
    responseObject.ErrorMessage = "Success!";
    responseObject.ResponseObject = respcheckUserTickets;
    return responseObject;
  } catch (err) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  } finally {
    client.close();
  }
};
