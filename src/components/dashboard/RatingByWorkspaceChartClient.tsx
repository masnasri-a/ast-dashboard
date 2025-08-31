"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WorkspaceData {
  workspace_name: string
  average_rating: number
  review_count: number
}

interface RatingByWorkspaceChartClientProps {
  data: WorkspaceData[]
}

export default function RatingByWorkspaceChartClient({ data }: RatingByWorkspaceChartClientProps) {
  const chartConfig = {
    average_rating: {
      label: "Average Rating",
      color: "#8884d8",
    },
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center text-gray-500">
        No data available
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="workspace_name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="average_rating"
          fill="#8884d8"
        />
      </BarChart>
    </ChartContainer>
  )
}
