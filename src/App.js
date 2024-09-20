import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment'
import DatePicker from "react-datepicker";
import { useReactToPrint } from 'react-to-print';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import InvoiceTable from './InvoiceTable';
import Header from './Header';
import { dropDownOptions } from './utils';
import "react-datepicker/dist/react-datepicker.css";
import border from './image/border16.png';

//https://github.com/vishalgupta02061991/ashok-jewellers/settings/pages

const App = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [formValues, setFormValues] = useState([{ name: "", quantity: "", weightInGrams: "", netWeightInGrams: "", itemTotal: "", purity: 18, stoneWeight: 0 }])
  const [goldPrice, setGoldPrice] = useState(localStorage.getItem('goldPrice'));
  const [isShowInvoice, setIsShowInvoice] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isShowInvoiceToogle, setIsShowInvoiceToogle] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [customerName, setCustomerName] = useState('');
  const [parentName, setParentName] = useState('');
  const [address, setAddress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(moment().format('YYYY-MM-DD'));
  const [branchName, setBranchName] = useState('');
  const [approveName, setApproveName] = useState('');
  const [shopPlace, setShopPlace] = useState('');
  const [accountNum, setAccountNum] = useState('');

  useEffect(() => {
    const unloadCallback = (event) => {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = ''
      }
      return '';
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    }

  }, [])

  const handleClose = () => setShow(false);
  const handleReset = () => {
    setFormValues([{ name: "", quantity: "", weightInGrams: "", netWeightInGrams: "", itemTotal: "", purity: 18, stoneWeight: 0 }]);
    setIsShowInvoice(false);
    setGrandTotal(0)
    setIsShowInvoiceToogle(false);
    setShow(false)
  }
  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  const renderModal = () => {
    return (<>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Please confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'><b>Are you want to reset ??</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReset}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>)
  }
  const handleAmount = (i, e) => {
    let newFormValues = [...formValues];
    let regExp = new RegExp(/^\d*\.?\d*$/);
    console.log(regExp.test(e.target.value), e.target.value)
    if (!regExp.test(e.target.value)) {
      return;
    }
    const n = e.target.value;
    console.log(Number(n), 'bb123')
    newFormValues[i][e.target.name] = n;
    const weightInGrams = newFormValues[i]['weightInGrams'] ?? 0;
    const purity = newFormValues[i]['purity'] ?? 0;
    const g = Number(goldPrice)
    const w = weightInGrams ? Number(weightInGrams)?.toFixed(3) : 0;
    const p = Number(purity);
    const goldPriceCartWise = Number(g * (p / 24))?.toFixed(3);

    const stoneW = newFormValues[i]['stoneWeight'] ?? 0;
    console.log(stoneW, 'pp123', w, w - stoneW)
    const stoneWeightNew = Number(stoneW);
    const netWeightItem = (w - stoneWeightNew?.toFixed(3))?.toFixed(3);

    const itemTotal = (netWeightItem * (goldPriceCartWise / 10)) > 0 ? (netWeightItem * (goldPriceCartWise / 10)).toFixed(3) : '';
    newFormValues[i]['itemTotal'] = Number(itemTotal)?.toFixed(4);
    newFormValues[i]['netWeightInGrams'] = netWeightItem

    console.log(stoneW, 'pp123', netWeightItem)
    setFormValues(newFormValues);
  }

  const addFormFields = () => {
    setIsShowInvoice(false);
    setIsShowInvoiceToogle(false);
    setFormValues([...formValues, { name: "", quantity: "", weightInGrams: "", netWeightInGrams: "", itemTotal: "", purity: 18, stoneWeight: 0 }])
  }

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    setIsShowInvoiceToogle(false);
  }

  const addGoldPrice = (event) => {
    let regExp = new RegExp(/^\d*\.?\d*$/);

    console.log(regExp.test(event.target.value), event.target.value)
    if (!regExp.test(event.target.value)) {
      return;
    }
    const price = Number(event.target.value);
    setGoldPrice(price);

    let newFormValues = [...formValues];

    console.log(newFormValues)
    if (newFormValues?.length > 0) {
      const updateItems = newFormValues?.map((item, i) => {
        const weightInGrams = item['weightInGrams'] ?? 0;
        const purity = item['purity'] ?? 0;
        const g = Number(event.target.value);
        const w = Number(weightInGrams).toFixed(3);
        const p = Number(purity);
        const goldPriceCartWise = Number(g * (p / 24))?.toFixed(3);
        const stoneW = item['stoneWeight'] ?? 0;
        const stoneWeightNew = Number(stoneW).toFixed(3);
        console.log(stoneWeightNew, 'ss123')
        const netWeightItem = (w - stoneWeightNew).toFixed(3);
        item['itemTotal'] = Number(netWeightItem * (goldPriceCartWise / 10)).toFixed(4);
        item['netWeightInGrams'] = netWeightItem;
        return item;

      })
      console.log(updateItems, 'qq')
      setFormValues(updateItems);
    }
  }

  const updateGoldPrice = () => {
    setGoldPrice(goldPrice);
    localStorage.setItem('goldPrice', goldPrice);
  }

  const getTotalAmount = () => {
    let newFormValues = [...formValues];
    let total = 0;
    newFormValues?.forEach((item, i) => {
      if (item.name && item.quantity && item.weightInGrams) {
        total = total + Number(item['itemTotal']);
      }
    })
    return total;
  }

  const showInvoice = () => {
    setIsShowInvoiceToogle(true);
    const amount = getTotalAmount();
    if (amount > 0) {
      setIsShowInvoice(true);
      setIsShowInvoiceToogle(false);
    }
    else {
      setIsShowInvoice(false)
    }
  }

  console.log(isShowInvoiceToogle, grandTotal, getTotalAmount(), 'kk123')

  useEffect(() => {
    setGrandTotal(getTotalAmount());
    setIsShowInvoiceToogle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);



  const resetIn = () => {
    setShow(true);
  }
  console.log(formValues, 'gh12')
  return (
    <div className='container1'>
      <div ref={componentRef} className={`addSpace ${isShowInvoice ? `invoiceScreen2` : ``}`}>
      
      {/* { isShowInvoice &&
      <div className='mt-1 headerImage'>
              <img src={border} alt="Logo" className='imageClass' />
      </div>

      } */}
        
        <Header />

        {isShowInvoice && <hr className='divider' />}
        {!isShowInvoice && <div className="contentContainer mb-4 mt-3">

          <div className='text-center heading mt-3 mb-3'>
            <h3>Create Invoice</h3>
          </div>
          {isShowInvoiceToogle && grandTotal === 0 &&
            <div className='text-center mt-2 mb-4 error'>
              <p className='error'>Please add atleast one item.</p>
            </div>
          }
          <div className="d-flex mt-1 goldPriceCont">
            <div className='gold'>
              <label>Current Gold Price</label>
              <input type="text" name="name" value={goldPrice} onChange={addGoldPrice} />
            </div>
            <div className="ml-3 goldBtn updatePriceClass">
              <button className="button add updateBtn" type="button" disabled={goldPrice ? false : true} onClick={() => updateGoldPrice()}>{goldPrice ? 'Update Price' : 'Set price'}</button>
            </div>
          </div>
          <form className="p-10">
            {formValues.map((element, index) => (
              <div className="row1 formClass">
                <div className="col1" key={`${index}-name`}>
                  <div>
                    <label>Name </label>
                    <input type="text" name="name" value={element?.name || ""} onChange={e => handleChange(index, e)} />
                  </div>
                </div>
                <div className="col1" key={`${index}-quantity`}>
                  <div>
                    <label>Quantity</label>
                    <input type="text" className='quantity dField' min={0} name="quantity" value={element?.quantity} onChange={e => handleAmount(index, e)} />

                  </div>
                </div>

                <div className="col1" key={`${index}-netWeightInGrams`}>
                  <div>
                    <label>Gross Weight in Gm</label>
                    <input type="text" name="weightInGrams" className='weightInGram dField' value={element?.weightInGrams || ""} onChange={e => handleAmount(index, e)} />

                  </div>
                </div>
                <div className="col1" key={`${index}-Stonesgm`}>
                  <div>
                    <label>Weight of Stones in gm</label>
                    <input type="text" name="stoneWeight" className='stoneWeight dField' value={element?.stoneWeight} onChange={e => handleAmount(index, e)} />

                  </div>
                </div>
                <div className="col1" key={`${index}-purity`}>
                  <div>
                    <label>Purity</label>
                    {/* <input type="text" name="purity" className='purity dField' value={element.purity || ""} onChange={e => handleAmount(index, e)} />
                     */}

                    <select name="purity" className="form-select purity dField" value={element.purity || ""} onChange={e => handleAmount(index, e)}>
                      {
                        dropDownOptions()?.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
                      }
                    </select>

                  </div>
                </div>
                <div className="col1" key={`${index}-weightInGrams`}>
                  <div>
                    <label>Net Weight in gm</label>
                    <input type="text" name="netWeightInGrams" className='netWeightInGrams dField' value={element?.netWeightInGrams} readOnly />

                  </div>
                </div>
                <div className="col1 d-flex itemTotalD " key={`${index}-itemTotal`}>
                  <div>
                    <label>Item Total</label>
                    <input type="text" className='dField itemTotal' name="itemTotal" value={element?.itemTotal || ""} readOnly />

                  </div>
                  <div>
                    {
                      index ?
                        <div className='lastRowRemove'><button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button></div>
                        : null
                    }
                  </div>
                </div>
              </div>
            ))}
            {grandTotal > 0 &&
              <div className='mt-8 mb-8 totalSection'>

                {grandTotal > 0 &&
                  <>
                    <div><strong><label> Total Amount </label> :  {getTotalAmount().toFixed(3)}  </strong></div></>
                }
              </div>
            }

            <div className="button-section">
              <button className="button add mr-2" type="button" onClick={() => addFormFields()}>Add New Item</button>
              <button className="button add mr-2" type="button" onClick={() => showInvoice()}>Show Invoice</button>
              <button className="button" type="button" onClick={resetIn}>Reset Invoice</button>
            </div>
          </form>

          {show && renderModal()}


        </div>
        }
        {
          isShowInvoice &&
          <div className='showInvoice mt-1' >
            <div className='text-center mb-2 mt-2'>
              <h2 className='appraiser'>APPRAISER CERTIFICATE</h2>
            </div>

            <div className='branchD mt-3'>
              <p> To Branch Manager</p>
              <p> State Bank of India</p>
              <div className='branchDetails d-flex'>
                <div className='col-3 place '> <input type="text" name="branchName" value={branchName} onChange={(e) => setBranchName(e?.target?.value)} /> </div>
                <div className='col-6 ml8'>Branch</div>
                <div className='col-1 alignContentRight'><label>Acc No.</label></div>
                <div className='col-2 accountNum place'>
                  <input type="text" name="accountNum" value={accountNum} onChange={(e) => setAccountNum(e?.target?.value)} />
                </div>
              </div>
              <div className='mt-3 place infoBlock'>
                <p>Dear Sir,</p>
                <div className='info'>
                  I hearby certify that Sri/Smt. <input type="text" name="customerName" value={customerName} onChange={(e) => setCustomerName(e?.target?.value)} /> S/W/D of
                  <input type="text" name="parentName" value={parentName} onChange={(e) => setParentName(e?.target?.value)} /> Resident of
                  <input type="text" name="address" value={address} onChange={(e) => setAddress(e?.target?.value)} />
                  who has sought gold loan from the Bank is not my relative and the gold against which the loan is sought is not purchased from me.
                  The ornaments/Coin have been weighted and appraised by me on
                  {/* <Form.Control
                    type="date"
                    name="purchaseDate"
                    placeholder="Purchase Date"
                    value={purchaseDate}
                    className="datepic purchaseDate"
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  /> */}
                  <DatePicker selected={purchaseDate} onChange={(date) => setPurchaseDate(date)} dateFormat="dd/MM/yyyy" /> in the presence of Sri/Smt
                  <input type="text" name="approveName" value={approveName} onChange={(e) => setApproveName(e?.target?.value)} /> (Cash in charge) and the exact weight purity of the metal and the market value of each item as on date
                  are indicated below.
                </div>
              </div> </div>

            <div className='width100 ovrerflow mt-4'>
              <InvoiceTable formValues={formValues} getTotalAmount={getTotalAmount} grandTotal={grandTotal} />
            </div>

            <div className='decimilar mt-2 mb-3'>
              <div className='decimilarText mb-2'>
                <p>Method(s) used for purity testing:</p>
                <p>I solemnly declare that weight, purity of the gold ornaments/precious stones indicated above are corrent and</p>
                <p> I undertake to indemnify Bank against any loss it may sustain on account of abt inaccuracy in the above appraisal.</p>
              </div>
              <div className='place mt-2'>
                <label>Place:</label>
                <input type="text" name="shopPlace" value={shopPlace} onChange={(e) => setShopPlace(e?.target?.value)} />
              </div>
              <div className='place mt-2'>
                <label>Date:</label>
                {/* <Form.Control
                  type="date"
                  name="datepic"
                  placeholder="DateRange"
                  value={date}
                  className="datepic"
                  onChange={(e) => setDate(e.target.value)}
                /> */}
                <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
              </div>

              <div className='mt-3 d-flex'>

                <div className='col-10'>
                  <div className='valuation'>
                    Valuation Fees Credited My Account No - <b className='crimson'>10761976651</b>
                  </div>
                  <div className='crimson valuation mt-3'>
                    Name & Signature of Borrower:
                  </div>

                  <div className='valuation fontSize20'>
                    Near Government Hospital, Dumariaganj Siddharth Nagar
                  </div>
                </div>

                <div className='col-2 appraiserText'>
                  <div style={{ textAlign: "left" }}>
                    <p > Your Faithfully</p>
                    <p> Appraiser </p>
                  </div>


                </div>

              </div>


            </div>
            <div className='mt-1'>
              <img src={border} alt="Logo" className='imageClass' />
            </div>
          </div>
        }

      </div>
      {isShowInvoice &&
        <div className='backToPrev mt-3 mb-4'>
          <button className="button print" type="button" onClick={handlePrint}>Print</button>
          <button className="button" type="button" onClick={() => setIsShowInvoice(false)}>Back To Prev Screen</button>
        </div>
      }
      <footer className="bg-light footer">
        <Row>
          <Col className='text-center'> ASHOK JEWELLERS </Col>
        </Row>
      </footer>
    </div>
  )
}

export default App;