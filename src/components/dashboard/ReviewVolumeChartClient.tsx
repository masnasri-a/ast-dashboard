"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VolumeData {
  month: string
  count: number
}

interface ReviewVolumeChartClientProps {
  data: VolumeData[]
}

export default function ReviewVolumeChartClient({ data }: ReviewVolumeChartClientProps) {
  const chartConfig = {
    count: {
      label: "Review Count",
      color: "#82ca9d",
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
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ChartContainer>
  )
}
