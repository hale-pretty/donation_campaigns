CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(512) NOT NULL,
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  profile_image VARCHAR(255),
  country VARCHAR(100),
  city VARCHAR(100),
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  short_description TEXT,
  about_me TEXT,
  comments_counter INT DEFAULT 0,
  campaigns_counter INT DEFAULT 0,
  contributions_counter INT DEFAULT 0
);
