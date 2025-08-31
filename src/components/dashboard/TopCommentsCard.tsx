import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Comment {
  name: string
  rating: string
  date: string
  comment: string
}

interface CommentsData {
  top_positive_comments: Comment[]
  top_negative_comments: Comment[]
  top_neutral_comments: Comment[]
}

async function fetchTopComments(): Promise<CommentsData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/top-comments`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch top comments')
    }

    const data = await res.json()
    return {
      top_positive_comments: data.top_positive_comments || [],
      top_negative_comments: data.top_negative_comments || [],
      top_neutral_comments: data.top_neutral_comments || []
    }
  } catch (error) {
    console.error('Error fetching top comments:', error)
    return {
      top_positive_comments: [],
      top_negative_comments: [],
      top_neutral_comments: []
    }
  }
}

export default async function TopCommentsCard() {
  const { top_positive_comments, top_negative_comments, top_neutral_comments } = await fetchTopComments()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Positive Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {top_positive_comments.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              No positive comments available
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_positive_comments.map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell>{comment.name}</TableCell>
                    <TableCell>{comment.rating}</TableCell>
                    <TableCell>{comment.date}</TableCell>
                    <TableCell>{comment.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Negative Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {top_negative_comments.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              No negative comments available
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_negative_comments.map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell>{comment.name}</TableCell>
                    <TableCell>{comment.rating}</TableCell>
                    <TableCell>{comment.date}</TableCell>
                    <TableCell>{comment.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Neutral Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {top_neutral_comments.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              No neutral comments available
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_neutral_comments.map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell>{comment.name}</TableCell>
                    <TableCell>{comment.rating}</TableCell>
                    <TableCell>{comment.date}</TableCell>
                    <TableCell>{comment.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
