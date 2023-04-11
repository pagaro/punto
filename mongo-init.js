db = db.getSiblingDB('punto');

db.createUser(
  {
    user: 'punto-user',
    pwd: 'punto',
    roles: [{ role: 'readWrite', db: 'punto' }]
  }
);

db.createCollection('users')

db.users.insertMany([
  {
    email: 'toto@gmail.com',
    dob: ISODate('2023-04-04T00:00:00.000Z'),
    password: '$2b$10$3GDB9jpLM/EXUBIJE.ER.e4E93LuE6aYKWcF8SydLxHXe7AFLhBy2',
    name: 'toto',
  },
  {
  email: 'titi@gmail.com',
  dob: ISODate('2023-04-04T00:00:00.000Z'),
  password: '$2b$10$3GDB9jpLM/EXUBIJE.ER.e4E93LuE6aYKWcF8SydLxHXe7AFLhBy2',
  name: 'titi',
}]);

db.createCollection('games')

db.games.insertMany([
  {
    name: 'toto',
    id_users: [],
    status: 'WAIT',
    id_handles: [],
  },
  {
  name: 'titi',
  id_users: [],
  status: 'WAIT',
  id_handles: [],
}]);
