"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface WorkspaceFeature {
  type: "Feature"
  geometry: {
    type: "Point"
    coordinates: [number, number]
  }
  properties: {
    workspace_id: number
    workspace_name: string
    average_rating: number
    review_count: number
  }
}

interface GeoJSONData {
  type: "FeatureCollection"
  features: WorkspaceFeature[]
}

export default function MapboxChart() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [data, setData] = useState<GeoJSONData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/locations-geojson`)
        if (!res.ok) {
          throw new Error('Failed to fetch location data')
        }
        const data: GeoJSONData = await res.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching location data:', error)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (data && mapContainer.current && !map.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

      // Add custom CSS for popup
      const style = document.createElement('style')
      style.setAttribute('data-mapbox-custom', 'true')
      style.textContent = `
        .mapboxgl-popup-content {
          padding: 0 !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        .mapboxgl-popup-close-button {
          color: #3b82f6 !important;
          font-size: 16px !important;
          padding: 4px 8px !important;
        }
        .mapboxgl-popup-close-button:hover {
          background-color: #dbeafe !important;
          color: #1d4ed8 !important;
        }
      `
      document.head.appendChild(style)

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.827153, -6.17511],
        zoom: 10
      })

      map.current.on('load', () => {
        if (map.current) {
          // Add source
          map.current.addSource('workspaces', {
            type: 'geojson',
            data: data
          })

          // Add layer for markers
          map.current.addLayer({
            id: 'workspace-markers',
            type: 'symbol',
            source: 'workspaces',
            layout: {
              'icon-image': 'marker-icon',
              'icon-size': 0.15,
              'icon-anchor': 'bottom',
              'icon-allow-overlap': true
            }
          })

          // Load the custom marker icon
          map.current.loadImage('/images/chart/marker.png', (error, image) => {
            if (error) throw error
            if (!map.current!.hasImage('marker-icon')) {
              map.current!.addImage('marker-icon', image!)
            }
          })

          // Add popup on click
          map.current.on('click', 'workspace-markers', (e: mapboxgl.MapMouseEvent) => {
            if (e.features && e.features[0]) {
              const feature = e.features[0] as unknown as GeoJSON.Feature<GeoJSON.Point, WorkspaceFeature['properties']>
              const properties = feature.properties

              new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: false,
                className: 'custom-popup'
              })
                .setLngLat(e.lngLat)
                .setHTML(`
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-xs">
                    <h3 class="font-semibold text-blue-900 text-base mb-2">${properties.workspace_name}</h3>
                    <div class="space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="text-blue-700 text-sm">Rating</span>
                        <span class="text-blue-900 font-medium">${properties.average_rating.toFixed(1)} ⭐</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-blue-700 text-sm">Reviews</span>
                        <span class="text-blue-900 font-medium">${properties.review_count}</span>
                      </div>
                    </div>
                  </div>
                `)
                .addTo(map.current!)
            }
          })

          // Change cursor on hover
          map.current.on('mouseenter', 'workspace-markers', () => {
            if (map.current) map.current.getCanvas().style.cursor = 'pointer'
          })

          map.current.on('mouseleave', 'workspace-markers', () => {
            if (map.current) map.current.getCanvas().style.cursor = ''
          })
        }
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
      // Clean up custom styles
      const customStyles = document.querySelectorAll('style[data-mapbox-custom]')
      customStyles.forEach(style => style.remove())
    }
  }, [data])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workspace Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data || !data.features.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workspace Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            No location data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="h-[400px] w-full" />
      </CardContent>
    </Card>
  )
}
