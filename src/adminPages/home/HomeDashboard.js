import "./homeDashboard.css"
import { ArrowUpward } from '@mui/icons-material';
import { useEffect } from "react";

export default function CaracteristiquesInfo() {
    useEffect(() => {
        //window.scrollTo(0, 0); // open the page on top
    }, []);
    return (
        <div className="caracteristiques">

            <div className="caracteristiquesItem" style={{backgroundColor:"#efebe9"}}>

                <span className="caracteristiquesTitre">Denúncias do Mês</span>

                <div className="caracteristiquesMoneyContainer">

                    <span className="caracteritiquesMoney">1.650</span>
                    
                    <span className="caracteritiquesMoneyTaux">20.4
                        <ArrowUpward className="caracteristiqueIcon " /> {/* Icon de la fleche negative */}
                    </span>
                    
                </div>

                <span className="caracteritiquesSub">Comparado com o mês passado</span>

            </div>
            
            <div className="caracteristiquesItem" style={{backgroundColor:"#ffe0b2"}}>
        
                <span className="caracteristiquesTitre">Denúncias resolvidas</span>

                <div className="caracteristiquesMoneyContainer">

                    <span className="caracteritiquesMoney">5.900</span>
                    <span className="caracteritiquesMoneyTaux">22.9
                        <ArrowUpward className="caracteristiqueIcon " /> {/* Icon de la fleche negative */}
                    </span>
                </div>

                <span className="caracteritiquesSub">Comparado com  mês passado</span>

            </div>

            <div className="caracteristiquesItem"style={{backgroundColor:"#eceff1"}}>

                <span className="caracteristiquesTitre">Denúncias por Tratar</span>

                <div className="caracteristiquesMoneyContainer">

                    <span className="caracteritiquesMoney">3.994</span>
                    <span className="caracteritiquesMoneyTaux">700
                        <ArrowUpward className="caracteristiqueIcon" /> {/* Icon de la fleche positive */}
                    </span>
                </div>

                <span className="caracteritiquesSub">Comparado com o ano passado</span>

            </div>

        </div>
    )
}
