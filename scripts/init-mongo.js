// Creates database and tables
db = db.getSiblingDB('planifAi');
db.createCollection('users');
db.createCollection('plans');
db.createCollection('itinerary');

// Create users with roles if needed
db.createUser({
  user: 'root',
  pwd: 'Password123!',
  roles: [
    { role: 'readWrite', db: 'planifAi' }
  ]
});
