db = db.getSiblingDB('punto');

db.createUser(
  {
    user: 'punto-user',
    pwd: 'punto',
    roles: [{ role: 'readWrite', db: 'punto' }]
  }
);
