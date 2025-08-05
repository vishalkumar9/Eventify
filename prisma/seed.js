const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const eventData = [
  {
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge innovations.",
    eventDate: new Date("2025-03-15T09:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    tier: "gold"
  },
  {
    title: "Startup Networking Event",
    description: "Connect with fellow entrepreneurs and investors in this exclusive networking event.",
    eventDate: new Date("2025-02-20T18:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    tier: "silver"
  },
  {
    title: "Web Development Workshop",
    description: "Learn the latest web development techniques and frameworks in this hands-on workshop.",
    eventDate: new Date("2025-02-28T10:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
    tier: "free"
  },
  {
    title: "AI & Machine Learning Summit",
    description: "Explore the future of AI and machine learning with top researchers and practitioners.",
    eventDate: new Date("2025-04-10T09:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    tier: "platinum"
  },
  {
    title: "Digital Marketing Masterclass",
    description: "Master the art of digital marketing with proven strategies and real-world case studies.",
    eventDate: new Date("2025-03-05T14:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    tier: "silver"
  },
  {
    title: "Open Source Contribution Day",
    description: "Contribute to open source projects and learn from experienced maintainers.",
    eventDate: new Date("2025-02-15T10:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    tier: "free"
  }
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.event.deleteMany()
  console.log('🗑️  Cleared existing events')

  // Insert seed data
  for (const event of eventData) {
    await prisma.event.create({
      data: event
    })
  }

  console.log(`✅ Seeded ${eventData.length} events`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })