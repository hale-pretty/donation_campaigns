CREATE TABLE IF NOT EXISTS campaign_images (
  id SERIAL PRIMARY KEY,
  campaign_id INT NOT NULL,
  image_url TEXT NOT NULL,
  CONSTRAINT fk_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);