import React from 'react'
import "./largeWidget.css"

export default function WidgetGd() {
    
    const Button = ({type}) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }

    return (
        <div className="widgetLg">
           <h3 className="widgetLgTitle">List de Usúarios</h3>

        <table className="widgetLgTable">
        <tbody>
            <tr className="widgetLgTh">
                <th className="widgetLgTh">Usuario</th>
                <th className="widgetLgTh">Email</th>
                <th className="widgetLgTh">Code</th>
                <th className="widgetLgTh">Função</th>
                <th className="widgetLgThStatut">Statuto</th>
            </tr>

            <tr className="widgetLgTr">
                <td className="widgetLgClient">
                    <img className="widgetLgImg" src="#" 
                    alt="" />
                </td>
                <td className="widgetLgDate">charles@gmail.com</td>
                <td className="widgetLgArticle">001</td>
                <td className="widgetLgAmontant">Law</td>
                <td className="widgetGdStatut"><Button type="Cancel"/></td>
            </tr>

            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="#" 
                    alt="" />
                </td>
                <td className="widgetLgDate">Bruce5@hotmail.com</td>
                <td className="widgetLgArticle">002</td>
                <td className="widgetLgAmontant">Engineering</td>
                <td className="widgetLgStatut"><Button type="Approved"/></td>
            </tr>


            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="#" 
                    alt="" />
                </td>
                <td className="widgetLgDate">mary10@aol.com</td>
                <td className="widgetLgArticle">003</td>
                <td className="widgetLgAmontant">Business Administration</td>
                <td className="widgetLgStatut"><Button type="Approved"/></td>
            </tr>


            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="#" 
                    alt="" />
                </td>
                <td className="widgetLgDate">Johnt@yahoo.com</td>
                <td className="widgetLgArticle">004</td>
                <td className="widgetLgAmontant">Public Administration</td>
                <td className="widgetLgStatut"><Button type="Processing"/></td>
            </tr>


            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="#" 
                    alt="" />
                </td>
                <td className="widgetLgDate">Yuhi@gmail.com</td>
                <td className="widgetLgArticle">005</td>
                <td className="widgetLgAmontant">Art and Culture</td>
                <td className="widgetLgStatut"><Button type="Approved"/></td>
            </tr>

            </tbody>
        </table>

        </div>
    )
}
