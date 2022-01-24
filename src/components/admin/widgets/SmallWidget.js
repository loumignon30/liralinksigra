import React from 'react'
import "./smallWidget.css"

import { Visibility
 } from '@mui/icons-material';

export default function WidgetPt() {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Novos Usuários</span>

            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" 
                    className="widgetSmImage"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUserName">João Walter</span>
                        <span className="widgetSmUserTitle">Software Architect</span>
                    </div>
                    <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon"/>
                    Show
                    </button>
                </li>

                <li className="widgetSmListItem">
                    <img alt="" src="https://storage.ws.pho.to/s2/be35ac71079f3a3912b3c36ea7421d79a2a7ab31_m.gif" 
                    className="widgetSmImage"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUserName">Yves Mpunga</span>
                        <span className="widgetSmUserTitle">Business Analyst.</span>
                    </div>
                    <button className="widgetSmButton">
                    <Visibility/>
                    Show
                    </button>
                </li>

                <li className="widgetSmListItem">
                    <img alt="" src="https://storage.ws.pho.to/s2/c89a75636028c8c12c32673b92c474162f5bba13_m.jpg" 
                    className="widgetSmImage"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUserName">Rick Ant</span>
                        <span className="widgetSmUserTitle">Coaching Expert</span>
                    </div>
                    <button className="widgetSmButton">
                    <Visibility/>
                    Show
                    </button>
                </li>

                <li className="widgetSmListItem">
                    <img alt="" src="https://media.gettyimages.com/photos/young-couple-in-public-park-stock-photo-picture-id1162109324?s=612x612" 
                    className="widgetSmImage"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUserName">JP Tonere</span>
                        <span className="widgetSmUserTitle">Business Analyst</span>
                    </div>
                    <button className="widgetSmButton">
                    <Visibility/>
                    Show
                    </button>
                </li>

                <li className="widgetSmListItem">
                    <img alt="" src="https://storage.ws.pho.to/s2/094362EE-AA2C-11E9-A888-02C7C72969FA_m.jpg" 
                    className="widgetSmImage"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUserName">Ted Blue</span>
                        <span className="widgetSmUserTitle">Investor</span>
                    </div>
                    <button className="widgetSmButton">
                    <Visibility/>
                    Show
                    </button>
                </li>
            </ul>
        </div>
    )
}
