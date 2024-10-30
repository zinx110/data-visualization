import { ExchangeRate } from "@/Types/Types";
import Link from "next/link";
import React from "react";
interface CurrencyCardInterface {
    data: ExchangeRate;
}
const CurrencyCard = ({ data }: CurrencyCardInterface) => {
    return (
        <Link
            href={`/singleCurrency/${data.asset_id_quote}`}
            className="w-full border border-slate-400 rounded-md p-3 grid grid-cols-3 hover:bg-gray-800"
        >
            <h1>{data.asset_id_quote}</h1>
            <p>{data.rate}</p>
            <p>{Intl.DateTimeFormat("en-us").format(new Date(data.time))}</p>
        </Link>
    );
};

export default CurrencyCard;
