"use client";
import { ExchangeRate } from "@/Types/Types";

import React, { useEffect, useState } from "react";

import axios from "axios";

import CurrencyCard from "./CurrencyCard";

const RealTimeStockChart: React.FC = () => {
    const [exchangeRateData, setExchangeRateData] = useState<ExchangeRate[]>(
        []
    );

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const config = {
                    method: "get",
                    maxBodyLength: Infinity,
                    url: "https://rest.coinapi.io/v1/exchangerate/USD",
                    headers: {
                        Accept: "text/plain",
                        "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
                    },
                };
                const response = await axios.request(config);
                const res = await response;
                if (response.status !== 200) {
                    alert("Error fetching data");
                    return;
                }
                console.log(res.data?.rates);
                const data = (res.data?.rates || []) as ExchangeRate[];
                setExchangeRateData(data);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        fetchStockData();
        // const intervalId = setInterval(fetchStockData, 60000000); // Fetch every minute

        // return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full max-w-5xl flex flex-col gap-3 text-white justify-center items-center flex-wrap">
            <h1 className="font-bold text-lg">
                Currency Exchange Rates(With USD)
            </h1>
            {exchangeRateData.slice(0, 10).map((item) => (
                <CurrencyCard key={item.asset_id_quote} data={item} />
            ))}
        </div>
    );
};

export default RealTimeStockChart;
