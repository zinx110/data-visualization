import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import { ExchangeRateHistory } from "@/Types/Types";
import axios from "axios";
import React from "react";
interface SingleCurrencyProps {
    params: Promise<{ id: string }>;
}
const SingleCurrency = async ({ params }: SingleCurrencyProps) => {
    const { id } = await params;
    const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://rest.coinapi.io/v1/exchangerate/USD/${id}/history?period_id=1DAY&time_start=${new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString()}&time_end=${new Date(Date.now()).toISOString()}`,

        headers: {
            Accept: "application/json",
            "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
    };
    const config2 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://rest.coinapi.io/v1/exchangerate/USD/EUR/history?period_id=1DAY&time_start=${new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString()}&time_end=${new Date(Date.now()).toISOString()}`,

        headers: {
            Accept: "application/json",
            "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
    };

    const res = await axios.request(config);
    const res2 = await axios.request(config2);
    if (res.status !== 200 || res.status !== 200) {
        return <h1>Error</h1>;
    }

    const data = res.data as ExchangeRateHistory[];
    const EUROData = res2.data as ExchangeRateHistory[];
    console.log(data);
    return (
        <div>
            <h1>Exchange Rate History for {id}</h1>
            <LineChart data={data} currency={id} />
            <BarChart data={data} currency={id} EUROData={EUROData} />
        </div>
    );
};

export default SingleCurrency;
