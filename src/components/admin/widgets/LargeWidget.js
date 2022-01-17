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
                    <img className="widgetLgImg" src="https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc=" 
                    alt="" />
                </td>
                <td className="widgetLgDate">charles@gmail.com</td>
                <td className="widgetLgArticle">001</td>
                <td className="widgetLgAmontant">Law</td>
                <td className="widgetGdStatut"><Button type="Cancel"/></td>
            </tr>

            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/08/Young-blind-woman-smiling-with-her-can-1296x728-header-1296x728.jpg?w=1155&h=1528" 
                    alt="" />
                </td>
                <td className="widgetLgDate">Bruce5@hotmail.com</td>
                <td className="widgetLgArticle">002</td>
                <td className="widgetLgAmontant">Engineering</td>
                <td className="widgetLgStatut"><Button type="Approved"/></td>
            </tr>


            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx55ptj9NcVc8BnuBrWujEy3vM3NuD_3aZbQ&usqp=CAU" 
                    alt="" />
                </td>
                <td className="widgetLgDate">mary10@aol.com</td>
                <td className="widgetLgArticle">003</td>
                <td className="widgetLgAmontant">Business Administration</td>
                <td className="widgetLgStatut"><Button type="Approved"/></td>
            </tr>


            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg" 
                    alt="" />
                </td>
                <td className="widgetLgDate">Johnt@yahoo.com</td>
                <td className="widgetLgArticle">004</td>
                <td className="widgetLgAmontant">Public Administration</td>
                <td className="widgetLgStatut"><Button type="Processing"/></td>
            </tr>


            <tr className="widgetLgTr">
                <td className="widgetLgMv">
                    <img className="widgetLgImg" src="https://2.gravatar.com/avatar/8be4188bccd6238472ec92169ced6479?s=400&d=mm&r=g" 
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
