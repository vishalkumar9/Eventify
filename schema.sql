-- Create enum type for tier
CREATE TYPE tier_enum AS ENUM ('free', 'silver', 'gold', 'platinum');

-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP NOT NULL,
    image_url TEXT NOT NULL,
    tier tier_enum NOT NULL
);