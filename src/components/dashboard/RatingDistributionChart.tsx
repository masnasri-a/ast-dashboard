import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RatingDistributionChartClient from "./RatingDistributionChartClient"

interface RatingData {
  rating: string
  count: number
}

async function fetchRatingDistribution(): Promise<RatingData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/rating-distribution`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch rating distribution')
    }

    const data = await res.json()
    return data.rating_distribution || []
  } catch (error) {
    console.error('Error fetching rating distribution:', error)
    return []
  }
}

export default async function RatingDistributionChart() {
  const data = await fetchRatingDistribution()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingDistributionChartClient data={data} />
      </CardContent>
    </Card>
  )
}
