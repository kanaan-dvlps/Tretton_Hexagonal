# Tretton Test API

## Run the app
The application is dockerized, using the command `docker-compose up -d --build` you can run it and build it.

There's a .env.example file just rename it and run the application on it, it's for the ease of testing otherwise it's a bad practise!

## Architecture
This test is based on the _Hexagonal architecture_ where we have our route as entry level, the adapter as our inbound and outbound proxy to intract with outside world, our ports as pur ACL (Anti Corruption Layer) to stop direct access and injection to our domain logic, and our domain logic as the main part of the application.

The domain logic based on the nature of the backend is using a _Transaction Script Pattern_ where all of our logic is procedural and we have a class with different methods or multiple functions and each class method/each function is responsible for one logic impelementation. It could use DDD pattern however it would much more complexity to our code which would over engineer the test. We could also use Asynchronous messaging and IPC and also RPC for communication from the entry point which could need a whole set of much more complex logic such as service discovery, messaging implementation, API gateway to name some, which could also be considered as over engineering the test.

For each procedure and domain logic invocation we have an adapter/proxy and for each of them we also have ports to handle the ACL level.

There's the token generation functionality which is not implemented in Hegxagonal architecture as we would implement the _Authentication and Authorization_ in a whole separate service!

The `GetCoworkers.js` API as the inbound adapter invokes a function called Scrapper and would make and _axios_ call to the Tretton API and then passing the data to a function called `Scrapper` to create the array of _coworkers_ and then `Scrapper` function calls a function to persist the data to caching system and also the database.

The `PersistScrappedData` creates a cache with 24 hours of expiration time and this elastic caching system is there to send back the responses faster and make the API have less database calles to take some load off of the database and it's infrastructure as well.
If the responses don't mach then we will update the caching system and also send back data from DB.

The `GetCoworkers` function inside our domain logic is calling the `Scrapper` function and then passes the HTML data that was received from the equivalent adapter and scrape the data, and then pass it to `PersistScrappedData` function to save it into cache and the DB system and also send back the array of coworkers.

The `GetCoworker` function is responsible for fetching only one coworker and its API has authentication involved as well, so you need a token to call this API.

The `EditCoworker` function will edit city, name, and text of the coworker.

## Routes
- @method `GET` _http://localhost:<PORT>/api/v3/coworkers_
- @method `GET` _http://localhost:<PORT>/api/v3/coworker_
- @method `PUT` _http://localhost:<PORT>/api/v3/coworker/:id_
- @method `POST` _http://localhost:<PORT>/api/v3/login_

## Modules
- Domain Logic: This module is responsible for implementing the whole logic of the application(test).

- Adapetrs: The adapters are for communicating with the outside world and consists of two types, _inbound_ and _outbound_. The inbound adapter is there to handle incoming requests, while the outbound adapter is there to handle communication with outside world. depending on what they do we can call the outbound adapters as _proxy_ as well.

- Ports: Are anti-corruption layer (ACL) to stop anything being injected or directly accessing the domain logic.

- Repository: Is responsible to handle communicating with the databse, and its methods.

- Routes: Are entry level to our domain logic.

## Dockerization
The Dockerfile consists of two stages which the first one is building the image out of a compelete Node.js image to create our package.json and then for security we will remove the `.npmrc` file so that if anyone got into the container they don't have access to the native runners in Node.js.

The second stage, will create the image based on the aplpine image, since in the first stage we have already created our dependencies will not have any problems running on alpine image.

Then we'll use an init-system (a supervisor) to manage PID 1 tasks and let Node.js run on othe PIDs than 1 to not to act strangly.

Then we'll use the default user that docker will build for us to perform root actions with that user for security matters.

And last but not least we'll run the whole application using the `CMD` command.

