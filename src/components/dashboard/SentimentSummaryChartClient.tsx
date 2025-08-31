"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

interface SentimentData {
  sentiment: string
  count: number
}

interface SentimentSummaryChartClientProps {
  data: SentimentData[]
}

export default function SentimentSummaryChartClient({ data }: SentimentSummaryChartClientProps) {
  const chartConfig = {
    positive: { label: "Positive", color: "#00C49F" },
    neutral: { label: "Neutral", color: "#FFBB28" },
    negative: { label: "Negative", color: "#FF8042" },
  }

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto aspect-square max-h-[300px] w-full flex items-center justify-center text-gray-500">
        No data available
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="count"
          nameKey="sentiment"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
