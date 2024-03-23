
db = db.getSiblingDB('etsisi');

db.rooms.insertMany([{
    "_id": ObjectId ("65fe271ca2caa41d8957c38f"),
    "name": "Room1",
    "capacity": 2,
    "createdAt": {
      "$date": "2024-03-23T00:49:32.692Z"
    },
    "updatedAt": {
      "$date": "2024-03-23T00:49:32.692Z"
    },
    "__v": 0
  },
  {
    "_id": ObjectId ("65fe273ba2caa41d8957c395"),
    "name": "Room3",
    "capacity": 3,
    "createdAt": {
      "$date": "2024-03-23T00:50:03.213Z"
    },
    "updatedAt": {
      "$date": "2024-03-23T00:50:03.213Z"
    },
    "__v": 0
  }]);