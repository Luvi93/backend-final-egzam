INSERT INTO Users (email, password, createdAt, updatedAt)
SELECT 'admin@example.com', '$2a$12$yN5mWkjmeXBCiy9GYmM8uO28gl5KWQm6gihKSFHDQgGhLKos8XBBS', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE email = 'admin@example.com');
