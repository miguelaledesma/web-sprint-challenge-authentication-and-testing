# Authentication and Testing Project for BloomTech

This challenge allowed me to practice the concepts and techniques learned over the Backend Development week 3 sprint. This sprint explored **Authentication and Testing**. During this sprint, I studied **authentication, JSON web tokens, unit testing, and backend testing**. In this challenge, I demonstrated my mastery of these skills by creating **a dad jokes app**.

This was an individual assessment. All work was done on my own. The project was submitted to Codegrade for automated review. 


## Project Setup

- [x] Run `npm install` to install your dependencies.
- [x] Build your database executing `npm run migrate`.
- [x] Run tests locally executing `npm test`.

## Project Functionality

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

Anybody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

User's password is hashed using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

- [x] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [x] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [x] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**Project Constraints:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Reflection 

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

JWTs are widely used as it scales better than that of a session-cookie based because tokens are stored on the client-side while the session uses the server memory to store user data. If we only want to send a client authentication to specific data and not all data we can use JWTs because they make a request to the server and only comeback with authorized data. 

JWT's are stateless, meaning they are never saved to the database. Instead, they are encrypted tokens that are signed (to ensure they do are not altered and are authentic) and include the user_id right inside the token- thus no database lookup is required to identify the user. API calls that require authentication must include an Authorization token in the header to go through.

With sessions, after a user successfully logs in, the server will generate a sessionId, signed with a secret key, and save that into the database. On the client side, it will send a cookie with that sessionId to the browser and the browser will save that cookie to local storage and include the cookie on every request. 


2. What does `bcryptjs` do to help us store passwords in a secure manner?
bycrypt allows use to hash a password so that the password does not show up in the data object as the real password. 
Bcryptjs also adds a random "salt" to the password the user enters and allows you to hash the password as many times as 2^8 etc etc, making it even harder to reverse engineer for hackers.



3. How are unit tests different from integration and end-to-end testing?
Unit testing is different from end to end testing because unit tests only tests specific functions as opposed to e2e testing where we are passing in fake data to fill in as if a client was using our website. End to end testing allows us to see where our code might be failing once it is in the hands of a client interaction. 


4. How does _Test Driven Development_ change the way we write applications and tests?
Test driven development works backwords. As opposed to writing our code first and ensuring that our code is working, we use tests to develop. We create a test for the functionality that we want in our code and then we program so that our tests pass. A downside to this is that we sometimes can get passing tests without our code doing what it wants to do. 
