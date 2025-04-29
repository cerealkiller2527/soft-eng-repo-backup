"use client"

import { useEffect, useRef } from "react"

interface MiniChartProps {
    data: number[]
    labels: string[]
    colors: string[]
}

export default function MiniChart({ data, labels, colors }: MiniChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Calculate total
        const total = data.reduce((sum, value) => sum + value, 0)

        // Draw pie chart
        let startAngle = 0

        data.forEach((value, index) => {
            const sliceAngle = (2 * Math.PI * value) / total

            ctx.fillStyle = colors[index]
            ctx.beginPath()
            ctx.moveTo(canvas.width / 2, canvas.height / 2)
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                Math.min(canvas.width, canvas.height) / 2 - 5,
                startAngle,
                startAngle + sliceAngle,
            )
            ctx.closePath()
            ctx.fill()

            startAngle += sliceAngle
        })
    }, [data, colors])

    return (
        <div className="flex flex-col items-center">
            <canvas ref={canvasRef} width={100} height={100} className="mb-2" />
            <div className="flex gap-4 text-xs">
                {labels.map((label, index) => (
                    <div key={label} className="flex items-center">
                        <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: colors[index] }} />
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
