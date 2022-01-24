import React from 'react'
import "./home.css"
import HomeDashboard from "./HomeDashboard"
// import { ChartPaymentsAnalysisData } from "../../services/admin/ChartPaymentsAnalysisData"
import Chart from "../../components/admin/chart/Chart"
import LargeWidget from "../../components/admin/widgets/LargeWidget"
import SmallWidget from "../../components/admin/widgets/SmallWidget"

import { useTranslation } from "react-i18next";

export default function Home() {

    const { t } = useTranslation();

    let totalDenuncia = t("total_denuncias")

    const ChartPaymentsAnalysisData = [
        {
          name: t('janeiro'),
          Total : 1000
        },
          {
            name: t('fevereiro'),
            Total : 2000
          },
          {
            name: t('marco'),
            Total: 10000
          },
          {
            name: t('abril'),
            Total: 2000
          },
          {
            name: t('maio'),
            Total: 5000
          },
          {
            name: t('junho'),
            Total: 1500
          },
          {
            name: t('julho'),
            Total: 8000
          },
          {
            name: t('agosto'),
            Total: 2500
          },
          {
            name: t('setembro'),
            Total: 3000
          },
    
          {
            name: t('outubro'),
            Total: 9900
          },
    
          {
            name:  t('novembro'),
            Total: 2500
          },
    
          {
            name: t('dezembro'),
            Total: 5400
          },
        
      ];


    return (
        <div className="home">
            <HomeDashboard />
            <Chart data={ChartPaymentsAnalysisData}
                title={t('mensagem_analise_denuncia_home_page')} grid dataKey="Total"
            />

            <div className="homeWidgets">

                <LargeWidget />
                <SmallWidget/>

            </div>

        </div>
    )
}

