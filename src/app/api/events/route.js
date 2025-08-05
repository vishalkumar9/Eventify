import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const tier = searchParams.get('tier')
    
    // Build where clause based on tier filter
    const whereClause = tier ? { tier: tier.toLowerCase() } : {}
    
    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: {
        eventDate: 'asc'
      }
    })
    
    return NextResponse.json({
      success: true,
      data: events,
      count: events.length
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch events' 
      },
      { status: 500 }
    )
  }
}