"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { Icon } from "@iconify/react/dist/iconify.js"

interface DashboardSectionProps {
    totalMembers?: number
    chartData?: {
        innerLayer: Array<{
            value: number
            name: string
            itemStyle: { color: string }
        }>
        outerLayer: Array<{
            value: number
            name: string
            itemStyle: { color: string }
        }>
    }
    stats?: Array<{
        icon: React.ReactNode
        value: number
        percentage?: number
        label: string
        bgColor: string
    }>
}

export default function DashboardSection({
    totalMembers = 215,
    chartData = {
        innerLayer: [
            { value: 250, name: "ស្កេនចូល", itemStyle: { color: "#22c55e" } },
            { value: 55, name: "មិនទាន់ស្កេន", itemStyle: { color: "#f97316" } },
        ],
        outerLayer: [
            { value: 200, name: "ស្កេនចេញ", itemStyle: { color: "#3b82f6" } },
            { value: 135, name: "ផ្សេងៗ", itemStyle: { color: "transparent" } },
        ],
    },
    stats = [
        {
            icon: <Icon icon="iconamoon:enter-thin" width="32" height="32" color="green" />,
            value: 250,
            percentage: 83,
            label: "ស្កេនចូល",
            bgColor: "bg-white/20",
        },
        {
            icon: <Icon icon="mdi:user-clock" width="32" height="32" color="gold" />,
            value: 10,
            label: "ច្បាប់",
            bgColor: "bg-white/20",
        },
        {
            icon: <Icon icon="mdi:airplane-clock" width="32" height="32" color="gold" />,
            value: 9,
            label: "បេសកកម្ម",
            bgColor: "bg-white/20",
        },
        {
            icon: <Icon icon="fluent-mdl2:leave" width="24" height="24" color="blue" />,
            value: 200,
            percentage: 80,
            label: "ស្កេនចេញ",
            bgColor: "bg-white/20",
        },
    ],
}: DashboardSectionProps) {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstance = useRef<echarts.ECharts | null>(null)

    useEffect(() => {
        if (!chartRef.current) return

        chartInstance.current = echarts.init(chartRef.current)

        const option: echarts.EChartOption = {
            tooltip: {
                trigger: "item" as const,
                formatter: "{b}: {c} ({d}%)",
                backgroundColor: "rgba(0,0,0,0.8)",
                textStyle: {
                    color: "#fff",
                },
            },
            series: [
                {
                    type: "pie" as const,
                    radius: ["75%", "90%"],
                    center: ["50%", "65%"],
                    startAngle: 180,
                    endAngle: 0,
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: chartData.innerLayer,
                },
                {
                    type: "pie" as const,
                    radius: ["60%", "75%"],
                    center: ["50%", "65%"],
                    startAngle: 180,
                    endAngle: 0,
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: chartData.outerLayer,
                },
            ],
        }

        chartInstance.current.setOption(option)

        const handleResize = () => {
            chartInstance.current?.resize()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            chartInstance.current?.dispose()
        }
    }, [chartData])

    const allChartData = [...chartData.innerLayer, ...chartData.outerLayer.filter((item) => item.name !== "ផ្សេងៗ")]

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto h-96">
            {/* Title */}
            <h2 className="text-3xl text-center">ស្ថិតិវត្តមានប្រចាំថ្ងៃ</h2>
            <div className="flex flex-col lg:flex-row items-center justify-start">
                {/* Chart Section */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="relative w-full h-full">
                        <div ref={chartRef} className="w-full h-72" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-white text-4xl font-bold">{totalMembers}</div>
                            <div className="text-white text-xl">កំពុងធ្វើការ</div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mb-9">
                            {allChartData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.itemStyle.color }} />
                                    <span className="text-white text-lg">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {stats.map((stat, index) => (
                        <div key={index} className={`${stat.bgColor} rounded-xl p-4`}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-white text-2xl font-bold">
                                        {stat.value}
                                        {stat.percentage && <span className="text-xl ml-1">({stat.percentage}%)</span>}
                                    </div>
                                    <div className="text-white text-xl">{stat.label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}