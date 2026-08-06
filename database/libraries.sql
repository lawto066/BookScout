CREATE TABLE libraries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location_name TEXT,
    charter_number TEXT,
    latitude DECIMAL,
    longitude DECIMAL
);

-- Dummy Data --
INSERT INTO libraries (name, location_name, charter_number, latitude, longitude)
VALUES
('Maddi''s Little Library', '123 Oak Street', 'CN-12345', 44.9778, -93.2650),

('Millie''s Book Corner', '2500 Upton Avenue South', 'CN-12346', 44.9577, -93.3140),

('Bear''s Book Nook', '845 River Street', 'CN-12347', 44.9850, -93.2580),

('Maple''s Reading Shelf', '112 Pine Avenue', 'CN-12348', 44.9695, -93.2792),

('Chase''s Book Exchange', '301 Lake Drive', 'CN-12349', 44.9448, -93.3075),

('Nolen''s Neighborhood Library', '87 Maple Street', 'CN-12350', 44.9812, -93.3011),

('Kaleigh''s Cozy Books', '450 Cedar Lane', 'CN-12351', 44.9510, -93.2874),

('Bella''s Book Garden', '99 Garden Avenue', 'CN-12352', 44.9734, -93.2418),

('Riverbend Readers', '612 Sunset Boulevard', 'CN-12353', 44.9643, -93.3297),

('Willow Creek Books', '75 Willow Road', 'CN-12354', 44.9908, -93.2745);
