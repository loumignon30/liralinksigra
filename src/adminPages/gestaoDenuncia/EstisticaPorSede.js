import { House } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Controls from '../../components/reusableComponents/Controls';
import PageHeader from '../../components/reusableComponents/PageHeader';
import { Form } from '../../components/reusableComponents/useForm';
import "./Estatisticas.css"
import Chart from "../../components/admin/chart/Chart"
import { useTranslation } from "react-i18next";
import DenunciaService from "../../services/admin/Denuncias.services";

const EstisticaPorSede = () => {

    const { t } = useTranslation();

    const ChartPaymentsAnalysisData = [
        {
            name: t('janeiro'),
            Total: 1000
        },
        {
            name: t('fevereiro'),
            Total: 2000
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
            name: t('novembro'),
            Total: 2500
        },

        {
            name: t('dezembro'),
            Total: 5400
        },

    ];

    const [data, setData] = useState([]);
    const [denunciaData, setDenunciaData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top

    }, []);



    const getGetAllData = (e) => {

        setDenunciaData([
            {
                name: "",
                Total: ""
            }
        ])

        DenunciaService.getAll("Todas", "estatistica1")
            .then(response => {
                response.data.map((info) => {
                    setDenunciaData(prevState => ([...prevState, {
                        name: info.sedeDenuncia.code,
                        Total: info.total_sedeID
                    }
                    ]))
                })

            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            <div className="estatisticasContainer">

                <div className="facultyContainer">
                    <PageHeader
                        title={t('estatistica_header')}
                        subTitle={t('estatistica_sub_header')}
                        backGroundColor="blue"
                        color="white"
                        icon={<House />}>
                    </PageHeader>
                </div>

                <Form autoComplete="off">

                    <div >

                        <div >
                            <Chart data={denunciaData}
                                title={t('mensagem_analise_denuncia_home_page')} grid dataKey="Total"
                            />

                        </div>

                        <div className="newEstatisticaButtons">

                            <div>
                                <Controls.Buttons
                                    type="button"
                                    text={t('estatistica_grafica_por_sede')}
                                    className="button"
                                    size="small"
                                    onClick={getGetAllData}
                                />
                                <Controls.Buttons
                                    type="button"
                                    text={t('estatistica_grafica_por_Agencia')}
                                    className="button"
                                    size="small"
                                />

                                <Controls.Buttons
                                    type="button"
                                    text={t('estatistica_resumo_denuncia')}
                                    className="button"
                                    size="small"
                                />
                                <Controls.Buttons
                                    type="button"
                                    text={t('estatistica_denuncia_nao_tratadas')}
                                    className="button"
                                    size="small"
                                />
                                <Controls.Buttons
                                    type="button"
                                    text={t('estatistica_denuncia_tratadas')}
                                    className="button"
                                    size="small"
                                />

                            </div>

                        </div>

                    </div>
                </Form>
            </div>
        </>
    )
}

export default EstisticaPorSede;
