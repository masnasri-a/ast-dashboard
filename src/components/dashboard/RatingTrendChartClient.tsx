"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TrendData {
  month: string
  average_rating: number
}

interface RatingTrendChartClientProps {
  data: TrendData[]
}

export default function RatingTrendChartClient({ data }: RatingTrendChartClientProps) {
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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="average_rating"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  )
}
