import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SentimentSummaryChartClient from "./SentimentSummaryChartClient"

interface SentimentData {
  sentiment: string
  count: number
}

async function fetchSentimentSummary(): Promise<SentimentData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/sentiment-summary`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch sentiment summary')
    }

    const data = await res.json()
    return [
      { sentiment: 'Positive', count: data.sentiment_summary.positive },
      { sentiment: 'Neutral', count: data.sentiment_summary.neutral },
      { sentiment: 'Negative', count: data.sentiment_summary.negative },
    ]
  } catch (error) {
    console.error('Error fetching sentiment summary:', error)
    return []
  }
}

export default async function SentimentSummaryChart() {
  const data = await fetchSentimentSummary()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <SentimentSummaryChartClient data={data} />
      </CardContent>
    </Card>
  )
}
