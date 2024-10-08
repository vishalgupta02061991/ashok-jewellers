import React from 'react';
import { Table } from 'react-bootstrap';
import { getCount } from './utils';

const InvoiceTable = ({ formValues, getTotalAmount, grandTotal }) => {
    return (
        <div className='tableContainer'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SI. No.</th>
                        <th>Description of the Article</th>
                        <th>Quantity</th>
                        <th>Gross Weight (Grams)</th>
                        <th>Approximate weight of the precious stones in the ornaments (Grams)</th>
                        <th>Purity (CARAT)</th>
                        <th>Net Weight (Grams)</th>
                        <th>Markrt Value Rs.</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // eslint-disable-next-line
                        formValues && formValues.map((item, i) => {
                            if (item.name && item.quantity && item.weightInGrams) {
                                return (
                                    <tr key={i + 1}>
                                        <td>{i + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{Number(item.quantity).toFixed(2)} Pc</td>
                                        <td>{Number(item?.weightInGrams)?.toFixed(3)}</td>

                                        <td>{Number(item?.stoneWeight)?.toFixed(3)}</td>
                                        <td>{item.purity} K</td>
                                        <td>{Number(item.weightInGrams - item.stoneWeight).toFixed(3)}</td>
                                        <td>{item.itemTotal}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    {
                        grandTotal && <tr className='lastC'>
                            <td ></td>

                            <td>Total</td>
                            <td>{Number(getCount('quantity', formValues))?.toFixed(2)} Pc</td>
                            <td>{Number(getCount('weightInGrams', formValues))?.toFixed(3)}</td>
                            <td>{Number(getCount('stoneWeight', formValues))?.toFixed(3)}</td>

                            <td>{''}</td>
                            <td>{Number(getCount('netWeightInGrams', formValues))?.toFixed(3)}</td>
                            <td>{getTotalAmount().toFixed(3)}</td>
                        </tr>

                    }
                </tbody>
            </Table>
        </div>
    )

}

export default InvoiceTable;