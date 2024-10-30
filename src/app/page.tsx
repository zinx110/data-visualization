import React from "react";
import RealTimeStockChart from "../components/RealTimeStockChart";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-white ">
            <RealTimeStockChart />
        </div>
    );
};

export default Home;
