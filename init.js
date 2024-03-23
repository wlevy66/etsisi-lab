db = db.getSiblingDB('etsisi');

const collectionList = ["reservations", "rooms", "schedules", "users"];
collectionList.map(
  (collection) => {db.createCollection(collection)}
);

