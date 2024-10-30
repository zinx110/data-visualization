export interface MetaData {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
}

export interface TimeSeriesEntry {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
}

export interface TimeSeries {
    [timestamp: string]: TimeSeriesEntry;
}

export interface StockData {
    "Meta Data": MetaData;
    "Time Series (5min)": TimeSeries;
}
export type StockInfo = {
    ticker: string;
    currency: string;
    security: string;
    mic: string;
    asset_type: string;
    cik: string;
    composite_figi: string;
    share_figi: string;
    lei: string;
};
export type ExchangeRate = {
    time: string; // ISO 8601 date string (UTC)
    asset_id_quote: string; // Currency code for the quote asset
    rate: number; // Exchange rate of the asset in the quoted currency
};
export interface ExchangeRateHistory {
    time_period_start: string; // ISO string for start of period
    time_period_end: string; // ISO string for end of period
    time_open: string; // ISO string for opening time
    time_close: string; // ISO string for closing time
    rate_open: number; // Rate at opening time
    rate_high: number; // Highest rate during the period
    rate_low: number; // Lowest rate during the period
    rate_close: number; // Rate at closing time
}
