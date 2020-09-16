To Call Register User Api POST [/signup] - Create new account
Sample Request:
Endpoint: {IP}/signup
body:
{
"FirstName" : "Value(String)",
"LastName" : "Value"(String),
"Password" : "Value(String)",
"EmailAddress" : "Value(String)",
"PhoneNumber" : "Value(String)"
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Registration Successful!"
}

---

To Call Login User Api POST [/login] - Login to user account
Sample Request:
Endpoint: {IP}/login
body:
{
"Username" : "Value(String)",
"Password" : "Value(String)"
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Login Successful!",
"ResponseObject": {
"\_id": "5f62563d19cb4f4860dd9f03",
"LastName": "Salami",
"FirstName": "Adebayo",
"Password": "password",
"PhoneNumber": "08092487818",
"EmailAddress": "salamibolarinwa16@gmail.com"
}
}

---

To Call Get Events Api GET [/events] -Get all upcoming event
Sample Request:
Endpoint: {IP}/events
response:{
"ResponseCode": "00",
"ResponseMessage": "Records Successfullly Retrieved",
"ResponseObject": [
{
"_id": "5f625ea5222d1c45b4389a72",
"Name": "Event The Bulb Africa",
"Location": "Online",
"HostedBy": "Africa",
"DateOfEvent": "01/10/2020",
"TicketPrice": "2000",
"TotalTicketsToBeSold": "40"
}
]
}

---

To Call POST events/?eventId?/ticket Api POST [/events/<eventId>/ticket] -Buy/reserve a ticket for an event
Sample Request:
Endpoint: {IP}/events/{Event objectID}/ticket
params: eventId(String)
body: {
"userId" : "value(String)"
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Ticket Reserved Successfully"
}

---

To Call PATCH /events/?eventId?/?ticketId? Api PATCH [/events/<eventId>/<ticketId>] -Cancel ticket reservation
Sample Request:
Endpoint: {IP}/events/{Event objectID}/{ticket objectID}
params: eventId(String)
params ticketId(String)
response:{
"ResponseCode": "00",
"ResponseMessage": "Ticket Cancelled Successfully"
}

---

To Call Add Event Api POST [/events] -Admin route to create a new event
Sample Request:
Endpoint: {IP}/events
body:
{
"EventName" : "Value(String)",
"EventLocation" : "Value(String)",
"EventHost" : "Value(String)",
"DateOfEvent" : "Value(Date)",
"EventTicketPrice" : "Value(Number)",
"TotalTicketsToBeAvailable" : "Value(Number)"
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Event Added Successfullly"
}

---

To Call Update Event Api PATCH [/events/:Id] -Admin route to update an event
Sample Request:
Endpoint: {IP}/events
params: Event_Id(String)
body:
{
"EventName" : "Value(String)", --Optional
"EventLocation" : "Value(String)", --Optional
"EventHost" : "Value(String)", --Optional
"DateOfEvent" : "Value(Date)", --Optional
"EventTicketPrice" : "Value(Number)", --Optional
"TotalTicketsToBeAvailable" : "Value(Number)" --Optional
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Event Updated Successfullly"
}

---

To Call Get ALL User Tickets For an event Api GET [/user/tickets] -Get all user’s reserved tickets for events
Sample Request:
Endpoint: {IP}/user/tickets
body:{
"UserID" : "Value(String)",
"EventID" : "Value(String)"
}
response:
"ResponseCode": "00",
"ResponseMessage": "Records Fetched Successfullly",
"ResponseObject": [
{
"_id": "5f6294583bbade6c1859d8d6",
"EventID": "5f625ea5222d1c45b4389a72",
"UserID": "5f628e9be1caf72304c9ab00",
"Price": "2000",
"Status": true
}
]
}

--

To Call Get All User's tickets Api GET [/<userId>/tickets] -Admin route to get all user’s reserved tickets
Sample Request:
Endpoint: {IP}/{user ObjectID}/tickets
params: userID
response:{
"ResponseCode": "00",
"ResponseMessage": "Records Fetched Successfullly",
"ResponseObject": [
{
"_id": "5f6294583bbade6c1859d8d6",
"EventID": "5f625ea5222d1c45b4389a72",
"UserID": "5f628e9be1caf72304c9ab00",
"Price": "2000",
"Status": true
}
]
