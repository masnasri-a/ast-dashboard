import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RatingTrendChartClient from "./RatingTrendChartClient"

interface TrendData {
  month: string
  average_rating: number
}

async function fetchRatingTrend(): Promise<TrendData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/rating-trend`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch rating trend')
    }

    const data = await res.json()
    return data.rating_trend || []
  } catch (error) {
    console.error('Error fetching rating trend:', error)
    return []
  }
}

export default async function RatingTrendChart() {
  const data = await fetchRatingTrend()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Trend Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingTrendChartClient data={data} />
      </CardContent>
    </Card>
  )
}
