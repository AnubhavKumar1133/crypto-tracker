"use client"

import { useRef, useEffect } from "react"

interface MiniChartProps {
  data: number[]
  trend: "up" | "down"
  width?: number
  height?: number
}

export default function MiniChart({ data, trend, width = 160, height = 50 }: MiniChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate min and max values for scaling
    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)
    const range = maxValue - minValue

    // Draw the line
    ctx.beginPath()
    ctx.strokeStyle = trend === "up" ? "#10b981" : "#ef4444"
    ctx.lineWidth = 1.5

    const step = width / (data.length - 1)

    data.forEach((value, index) => {
      // Scale the y value to fit in the canvas
      const y = height - ((value - minValue) / range) * height * 0.8 + height * 0.1
      const x = index * step

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  }, [data, trend, width, height])

  return (
    <div className="flex justify-end">
      <canvas ref={canvasRef} width={width} height={height} className="w-[160px] h-[50px]" />
    </div>
  )
}
