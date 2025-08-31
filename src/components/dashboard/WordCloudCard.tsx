"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface WordCloudItem {
  word: string
  count: number
}

export default function WordCloudCard() {
  const [wordCloud, setWordCloud] = useState<WordCloudItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/word-cloud`)
      .then(res => res.json())
      .then(data => {
        setWordCloud(data.word_cloud || [])
      })
      .catch(() => setWordCloud([]))
      .finally(() => setLoading(false))
  }, [])

  const getFontSize = (count: number) => {
    const maxCount = Math.max(...wordCloud.map(item => item.count))
    const minSize = 14
    const maxSize = 32
    return minSize + ((count / maxCount) * (maxSize - minSize))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Word Cloud</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 h-[300px] overflow-hidden">
            {wordCloud.map((item, index) => (
              <span
                key={index}
                className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
                style={{
                  fontSize: `${getFontSize(item.count)}px`,
                  fontWeight: item.count > 1 ? 'bold' : 'normal'
                }}
                title={`Count: ${item.count}`}
              >
                {item.word}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
