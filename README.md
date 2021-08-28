# beverage-delivery

## Software Architecture and Design

The api of the beverage delivery problem was developed in Nodejs. To design the solution and the approach of tests was used TDD (Test-driven Development) and the project is organized by responsability layers:

* **Control**: database and storage files;
* **Models**: params and business models;
* **Routes**: route for the request endpoints;
* **Service**: methods or functions;
* **Test**: test files;
* **Utils**: validator and error handling.

## Modeling of the distribution centers map

The map was modeling considering a graph with edge weight. To represent the graph, I build an object where each key is a location that points for a list of adjacent locations, each location containing the distance between them.

![](./graph.png)

```
models/location.js

let graph = {    
    A: {B: 5},
    B: {A: 5, C: 7, D: 3},
    C: {B: 7, E: 4},
    D: {B: 3, E: 10, F: 8},
    E: {C: 4, D: 10},
    F: {D: 8}    
}
```

## Database 

To iterate between vehicles and orders I used NeDB - a lightweight embedded document DBMS written in JavaScript.
I created two collections: orders.db and vehicles.db, that will be automatically loaded when the API start running and the request is triggered.

## Build and Run

* Step 1 - cloning the repo https://github.com/milton-jr92/beverage-delivery.git;
* Step 2 - inside the folder /beverage-delivery, execute the command "npm install";
* Step 3 - once the installed is concluded with success and no errors (some warning may appear depending of the arch where is being executed), we can start run the API with the command "node main" ("Server is running on port 9000" should appear).

Another option is generating an image and executing as a container with docker after cloning the repo, check the Dockerfile to see the config.

As the API is up and running the endpoints can be executed:

```
POST http://localhost:9000/v1/order
POST http://localhost:9000/v1/vehicle
GET http://localhost:9000/v1/order/1/vehicle/ranking
```

## Test

I used Jest to test and validate the requirements. The files Order and Vehicle has the integration tests of HTTP execution and the ranking file has unit tests to automate and validate the methods and functions.

* To execute the automated tests, run the command "npm test".

## Time Complexity and Performance

To calculate the shortest distance between an vehicle and a store, I used the Dijkstra Algorithm.
The time complexity of this algorithm is O(Elog(V)) - big O notation -, where:

* V is the number of vertices (locations);
* E is the total number of edges (paths);

So the time complexity will be the total number of stores (n) times number of vehicles (m), plus shortest path algorithm, which gives us something like (n * m) + O(Elog(V))
