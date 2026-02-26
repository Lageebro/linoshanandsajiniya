// Initialize Dexie database
const db = new Dexie("WeddingDB");

// Define the database schema
db.version(1).stores({
    guestbook: '++id, name, message, timestamp'
});

console.log("Dexie Database Initialized");
