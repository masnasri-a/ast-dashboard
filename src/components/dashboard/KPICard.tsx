"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function KPICard() {
  const [kpiData, setKpiData] = useState<{
    average_rating: number | null
    total_rating: number | null
    review_count: number | null
  }>({
    average_rating: null,
    total_rating: null,
    review_count: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/average-rating`)
      .then(res => res.json())
      .then(data => {
        setKpiData({
          average_rating: data.average_rating,
          total_rating: data.total_rating,
          review_count: data.review_count
        })
      })
      .catch(() => setKpiData({
        average_rating: null,
        total_rating: null,
        review_count: null
      }))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Key Performance Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-18" />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Rating</span>
              <span className="text-lg font-bold text-blue-600">
                {kpiData.average_rating?.toFixed(2) || 'N/A'} ⭐
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Ratings</span>
              <span className="text-lg font-bold text-green-600">
                {kpiData.total_rating?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Review Count</span>
              <span className="text-lg font-bold text-purple-600">
                {kpiData.review_count?.toLocaleString() || 'N/A'}
              </span>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Overall customer satisfaction metrics
        </p>
      </CardContent>
    </Card>
  )
}
