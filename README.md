# RESTful using NodeJS + Express + MongoDB + Typescript
![alt text](https://travis-ci.org/brije111/express-app.svg?branch=master)

## A dummy rest app using node + typescript + express + mongodb
### This sample is based on series of implementations https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf

## Route
### Contact
#### -/contact
#### --GET
#### --- Result : All Contacts
#### --POST(firstName:string, lastName:string, email:string, company:string, phone:string)
#### --- Result : Add New Contact
#### -/contact/id
#### --GET
#### --- Result : Specific Contact
#### --PUT
#### --- Update Specific Contact
#### --DELETE
#### --- Delete specific Contact

### User
#### -/user
#### --GET
#### --- Result : All Users. Need authorization header
#### --POST(email:string, password:string)
#### --- Add New User
#### -/signin
#### --POST(email:string, password:string)
#### --- Result : Specific user
