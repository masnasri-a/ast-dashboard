import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RatingByWorkspaceChartClient from "./RatingByWorkspaceChartClient"

interface WorkspaceData {
  workspace_name: string
  average_rating: number
  review_count: number
}

async function fetchRatingByWorkspace(): Promise<WorkspaceData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/rating-by-workspace`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch rating by workspace')
    }

    const data = await res.json()
    return data.rating_by_workspace || []
  } catch (error) {
    console.error('Error fetching rating by workspace:', error)
    return []
  }
}

export default async function RatingByWorkspaceChart() {
  const data = await fetchRatingByWorkspace()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating by Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingByWorkspaceChartClient data={data} />
      </CardContent>
    </Card>
  )
}
