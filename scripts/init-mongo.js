// Creates database and tables
db = db.getSiblingDB('project_db');
db.createCollection('users');
db.createCollection('plans');
db.createCollection('itinerary');

// db.createUser({
//   user: 'root',
//   pwd: 'Password123!',
//   roles: [
//     { role: 'readWrite', db: 'project_db' }
//   ]
// });
