import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReviewVolumeChartClient from "./ReviewVolumeChartClient"

interface VolumeData {
  month: string
  count: number
}

async function fetchReviewVolume(): Promise<VolumeData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/review-volume`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch review volume')
    }

    const data = await res.json()
    return data.review_volume || []
  } catch (error) {
    console.error('Error fetching review volume:', error)
    return []
  }
}

export default async function ReviewVolumeChart() {
  const data = await fetchReviewVolume()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Volume Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ReviewVolumeChartClient data={data} />
      </CardContent>
    </Card>
  )
}
