import {assets} from "../assets/assets.js";
import {Trash2} from "lucide-react";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

const InvoiceForm = () => {
    const {invoiceData, setInvoiceData} = useContext(AppContext);

    const addItem = () => {
        setInvoiceData((prev => ({
            ...prev,
            items: [,
            ...prev.items,
            {name: "", qty: "", amount: "", description: "", total: 0 }
                ]
        })))
    };

    return (
        <div className="invoiceform container py-4">

            {/* Company logo */}
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img src={assets.upload_area} alt="upload" width={98}/>
                        <div>Click to upload your logo</div>
                    </label>
                    <input type="file" name="logo" id="image" hidden className="form-control" accept="image/*" />
                </div>
            </div>
            {/* Company info */}
            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Company name"/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Company phone number"/>
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Company address"/>
                    </div>
                </div>
            </div>
            {/* Billing section */}
            <div className="mb-4">
                <h5>Bill to</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Phone number"/>
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Address"/>
                    </div>
                </div>
            </div>
            {/* Ship to */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship to</h5>
                    <div className="form-check">
                        <input type="checkbox" className='form-check-input' id="sameAsBilling"/>
                        <label htmlFor="sameAsBilling" className="form-check-label">
                            Same as Billing
                        </label>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Phone number"/>
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Shipping address"/>
                    </div>
                </div>
            </div>
            {/* Invoice info */}
            <div className="mb-4">
                    <h5>Invoice information</h5>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                            <input type="text" disabled className="form-control" placeholder="Invoice Number"id={"invoiceNumber"}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                            <input type="date" className="form-control" id="invoiceDate"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="invoiceDueDate" className="form-label">Invoice Due Date</label>
                            <input type="date" className="form-control" id="invoiceDueDate"/>
                        </div>
                    </div>
                </div>
            {/* Item details */}
            <div className="mb-4">
                <h5>Item Details</h5>
                {invoiceData.items.map((item, index) => (
                    <div key={index} className="card p-3 mb-3">
                    <div className="row g-3 mb-2">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Item Name"/>
                        </div>
                        <div className="col-md-3">
                            <input type="number" placeholder="Quantity" className="form-control"/>
                        </div>
                        <div className="col-md-3">
                            <input type="number" placeholder="Amount" className="form-control"/>
                        </div>
                        <div className="col-md-3">
                            <input type="number" className="form-control" placeholder="Total"/>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <textarea className="form-control" placeholder="Description"></textarea>
                        {invoiceData.items.length > 1 && (
                        <button className="btn btn-outline-danger" type="button">
                            <Trash2 size={18} />
                        </button>
                        )}
                    </div>
                </div>
                ))}
                <button className="btn btn-primary" type="button" onClick={addItem}>Add Item</button>
            </div>
            {/* Bank details */}
            <div className="mb-4">
                <h5>Bank Account Details</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Recipent name"/>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="IBAN"/>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Bank SWIFT"/>
                    </div>
                </div>
            </div>
            {/* Total */}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>${1000}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">Tax Rate (%)</label>
                            <input type="number" id="taxInput" className="form-control w-50 text-end" placeholder="Input tax rate in %" />
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax amount</span>
                            <span>${1000}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>${1000}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Notes */}
            <div className="mb-4">
                <h5>Notes:</h5>
                <div className="w-100">
                    <textarea name="notes" className="form-control" rows={3}></textarea>
                </div>
            </div>

        </div>
    )
}

export default InvoiceForm;