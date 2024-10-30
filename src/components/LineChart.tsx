"use client";
import { ExchangeRateHistory, StockData } from "@/Types/Types";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartData {
    x: number;
    y: number;
}
interface LineChartProps {
    data: ExchangeRateHistory[];
    currency: string;
}
const LineChart = ({ data, currency }: LineChartProps) => {
    const [series, setSeries] = useState([
        { name: "Stock Price", data: [] as ChartData[] },
    ]);
    const [options, setOptions] = useState<any>({
        colors: ["#11F111", "#F02623"],
        chart: {
            foreColor: "#ffffff",
            id: "realtime",
            type: "line",
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: { speed: 1000 },
            },
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: { type: "datetime" },
        yaxis: { title: { text: `Exchange Rate ${currency}` } },
        title: {
            text: `USD to ${currency} Exchange Rates Historical Data`,
            align: "left",
            offsetY: 25,
            offsetX: 20,
        },
        grid: {
            show: true,
            padding: {
                bottom: 0,
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            offsetY: -20,
        },
    });

    useEffect(() => {
        console.log("data", data);
        if (data == null) return;
        const tempChartDataHigh: ChartData[] = [];
        let labels: string[] = [];
        const tempChartDataLow: ChartData[] = [];

        labels = data.map((d) => d.time_open);
        data.forEach((time) => {
            tempChartDataHigh.push({
                x: new Date(time.time_open).getTime(),
                y: time.rate_high,
            });
            tempChartDataLow.push({
                x: new Date(time.time_open).getTime(),
                y: time.rate_low,
            });
            labels.push(time.time_open);
        });

        setSeries([
            { name: "High", data: tempChartDataHigh },
            // { name: "Low", data: tempChartDataLow },
        ]);
        setOptions((prev) => ({ ...prev, labels: labels }));
    }, [data]);

    return (
        <div className="p-6 rounded-lg shadow-md max-w-5xl w-full mx-auto mt-6 text-gray-50">
            <h2 className="text-2xl font-semibold  text-center mb-4">
                USD to ${currency} Exchange Rates Historical Data
            </h2>
            <ApexCharts
                options={options}
                series={series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default LineChart;
