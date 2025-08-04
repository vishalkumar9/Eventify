# Eventify 🎉

A modern event management platform built with Next.js, featuring tier-based access control and beautiful UI.

## Features

- **Tier-Based Access Control**: Users can only view events matching their tier level or below
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Event Filtering**: Filter events by tier (Free, Silver, Gold, Platinum)
- **Reusable Components**: Modular architecture with reusable EventCard component
- **Mock Data**: Pre-populated with sample events for demonstration

## Tier System

- **Free**: Access to free events only
- **Silver**: Access to free and silver events
- **Gold**: Access to free, silver, and gold events  
- **Platinum**: Access to all events (free, silver, gold, platinum)

## Tech Stack

- **Framework**: Next.js 15.4.5
- **Styling**: Tailwind CSS v4
- **Language**: JavaScript
- **Database Schema**: PostgreSQL (Supabase ready)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Eventify/
├── src/
│   ├── app/
│   │   ├── page.js          # Main events page
│   │   ├── layout.js        # Root layout with metadata
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   └── EventCard.js     # Reusable event card component
│   └── data/
│       └── mockData.js      # Static event data and configurations
├── schema.sql               # Database schema for Supabase
├── package.json
└── README.md
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.