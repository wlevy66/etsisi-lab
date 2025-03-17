db = db.getSiblingDB('etsisi')

db.users.insertOne({
  "name": "Admin",
  "lastname": "User",
  "phone": "123456789",
  "email": "admin@admin.es",
  "password": "$2a$10$hWcb9Z29ud3YNPJgafLPeO/7fF6jE77mXri8Rv3TaoCtCsLPUNh6a", // Adm1nistrad0r
  "role": "ADMIN_ROLE",
  "status": "ACTIVE",
  "createdAt": new Date(),
  "updatedAt": new Date()
});