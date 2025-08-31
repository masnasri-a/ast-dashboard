"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

interface RatingData {
  rating: string
  count: number
}

interface RatingDistributionChartClientProps {
  data: RatingData[]
}

export default function RatingDistributionChartClient({ data }: RatingDistributionChartClientProps) {
  const chartConfig = data.reduce((config, item, index) => {
    config[item.rating] = {
      label: item.rating,
      color: COLORS[index % COLORS.length],
    }
    return config
  }, {} as Record<string, { label: string; color: string }>)

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
          nameKey="rating"
          cx="50%"
          cy="50%"
          outerRadius={80}
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
