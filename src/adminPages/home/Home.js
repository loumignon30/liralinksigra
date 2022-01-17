import React from 'react'
import "./home.css"
import HomeDashboard from "./HomeDashboard"
import { ChartPaymentsAnalysisData } from "../../services/admin/ChartPaymentsAnalysisData"
import Chart from "../../components/admin/chart/Chart"
import LargeWidget from "../../components/admin/widgets/LargeWidget"
import SmallWidget from "../../components/admin/widgets/SmallWidget"


export default function Home() {
    return (
        <div className="home">
            <HomeDashboard />
            <Chart data={ChartPaymentsAnalysisData}
                title="Analíses de denúncias" grid dataKey="Total denúncias" 
            />

            <div className="homeWidgets">

                <LargeWidget />
                <SmallWidget/>

            </div>

        </div>
    )
}

