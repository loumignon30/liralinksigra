import React from "react";

import "./chart.css"
import {
    LineChart, Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie
}
    from 'recharts';

export default function Chart({ title, data, dataKey, grid }) {

    return (
        <div className="chart">
            <h3 className="chartTitre"> {title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>

                    <YAxis type="number" domain={[0, 500]} tickCount={11}  
                    />
                   
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5 " />}
                    {/* <Legend/> */}
                </LineChart >
            </ResponsiveContainer>
            
        </div>
    )
}
