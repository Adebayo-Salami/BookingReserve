To Call Register User Api POST [/signup]
Sample Request:
Endpoint: {IP}/signup
body:
{
"FirstName" : "Value",
"LastName" : "Value",
"Password" : "Value",
"EmailAddress" : "Value",
"PhoneNumber" : "Value"
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Registration Successful!"
}

To Call Login User Api POST [/login]
Sample Request:
Endpoint: {IP}/login
body:
{
"Username" : "Value",
"Password" : "Value"
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

To Call Add Event Api POST [/events]
Sample Request:
Endpoint: {IP}/events
body:
{
"EventName" : "Value",
"EventLocation" : "Value",
"EventHost" : "Value",
"DateOfEvent" : "Value",
"EventTicketPrice" : "Value",
"TotalTicketsToBeAvailable" : "Value"
}
response:{
"ResponseCode": "00",
"ResponseMessage": "Event Added Successfullly"
}

To Call Get Events Api GET [/events]
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
