import "./homeDashboard.css"
import { ArrowUpward } from '@mui/icons-material';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function CaracteristiquesInfo() {
    const { t } = useTranslation();

    useEffect(() => {
        //window.scrollTo(0, 0); // open the page on top
    }, []);
    return (
        <div className="caracteristiques">

            <div className="caracteristiquesItem" style={{backgroundColor:"#efebe9"}}>

                <span className="caracteristiquesTitre">{t('mensagem_denuncia_do_mes')}</span>

                <div className="caracteristiquesMoneyContainer">

                    <span className="caracteritiquesMoney">1.650</span>
                    
                    <span className="caracteritiquesMoneyTaux">20.4
                        <ArrowUpward className="caracteristiqueIcon " /> {/* Icon de la fleche negative */}
                    </span>
                    
                </div>

                <span className="caracteritiquesSub">{t('mensagem_denuncia_comparado_com_o_mes_passado')}</span>

            </div>
            
            <div className="caracteristiquesItem" style={{backgroundColor:"#ffe0b2"}}>
        
                <span className="caracteristiquesTitre">{t('mensagem_denuncia_resolvidas')}</span>

                <div className="caracteristiquesMoneyContainer">

                    <span className="caracteritiquesMoney">5.900</span>
                    <span className="caracteritiquesMoneyTaux">22.9
                        <ArrowUpward className="caracteristiqueIcon " /> {/* Icon de la fleche negative */}
                    </span>
                </div>

                <span className="caracteritiquesSub">{t('mensagem_denuncia_comparado_com_o_mes_passado')}</span>

            </div>

            <div className="caracteristiquesItem"style={{backgroundColor:"#eceff1"}}>

                <span className="caracteristiquesTitre">{t('mensagem_denuncia_por_tratar')}</span>

                <div className="caracteristiquesMoneyContainer">

                    <span className="caracteritiquesMoney">3.994</span>
                    <span className="caracteritiquesMoneyTaux">700
                        <ArrowUpward className="caracteristiqueIcon" /> {/* Icon de la fleche positive */}
                    </span>
                </div>

                <span className="caracteritiquesSub">{t('mensagem_denuncia_comparado_com_o_ano_passado')}</span>

            </div>

        </div>
    )
}
