import React from 'react';
import logo from './logo.png';
const Header = () => {

    return (
        <div className='headingContainer'>
            <div className='headerClass'>
                <div className='headerLogo d-flex'>
                    <div className='col-2' style={{ textAlign: "left" }}>
                        <img src={logo} className="App-logo" alt="logo" style={{ height: "25" }} height={25} />
                    </div>
                    <div className='col-10'>
                        <div className><h1 style={{ paddingRight: "15%" }}>  ASHOK JEWELLERS </h1>
                            <div className='para headerParaText' style={{ paddingRight: "15%" }}>Deals in Gold & Silver Hallmark Jewellery </div>
                        </div>
                    </div>
                </div>

                {/* <h1>  ASHOK JEWELLERS </h1>
                <div className='para headerParaText mt-3' style={{ fontSize: "18px" }}>Deals in Gold & Silver Hallmark Jewellery </div>
             */}
            </div>
            <div className='d-flex mobileGstContainer'>
                <div className=' mt-2 col-9'>
                    <div className='mobile'>
                        Mobile No : 9161626642
                    </div>
                    <div className='mobile mt-2'>
                        GSTIN : 09BKUPS4358G1ZC
                    </div>
                </div>
                <div className='textRight mt-2 col-3'>
                    Annexure - PL-61(I)
                </div>
            </div>
        </div>
    )

}

export default Header;