Tikeets is a ticket booking/reservation and event management platform

What this app should entail

Users can create an account and log in.                        

Users can view all upcoming events

Users can book a ticket for multiple people

Users should get an email about the ticket reserved for the event, including the calendar details (date and time)

Users can cancel their reservations

Users can view all their reservations

Admin can add new events

Admin can see all tickets reserved for any event

Admin can update or delete an event

Challenge Summary
You are expected to create a set of API endpoints already defined below and use any database of choice to persist your data.
-------------------------------------------------------------------

Ensure that your API endpoints are properly tested

Add a code coverage badge to your README

Document your project in your README

Your project should be hosted online and also create a repository on GitHub for the project(s) 

------------------------------------------------------------------

Endpoint                                Functionality
POST /signup                            Create new account      --done
POST /login                             Login to user account   --done
GET /events                             Get all upcoming event
POST events/<eventId>/ticket            Buy/reserve a ticket for an event
PATCH /events/<eventId>/<ticketId>      Cancel ticket reservation
POST /events                            Admin route to create a new event
PATCH /events/<eventId>                 Admin route to update an event
GET /user/tickets                       Get all user’s reserved tickets for events
GET /<userId>/tickets                   Admin route to get all user’s reserved tickets

