import {assets} from "../assets/assets.js";
import {Trash2} from "lucide-react";
import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";

const InvoiceForm = () => {
    const {invoiceData, setInvoiceData} = useContext(AppContext);

    const addItem = () => {
        // FIX: Removed the leading comma which created an empty item in the array.
        setInvoiceData((prev => ({
            ...prev,
            items: [
                ...prev.items,
                {name: "", qty: "", amount: "", description: "", total: 0}
            ]
        })))
    };

    const deleteItem = (index) => {
        const items = invoiceData.items.filter((_, i) => i !== index)
        setInvoiceData((prev) => ({...prev, items}));
    }

    const handleChange = (section, field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    }

    const handleSameAsBilling = () => {
        setInvoiceData((prev) => ({
            ...prev,
            shipping: {...prev.billing}
        }))
    }

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = value;
        // This calculation is correct
        if (field === "qty" || field === "amount") {
            const qty = Number(items[index].qty) || 0;
            const amount = Number(items[index].amount) || 0;
            items[index].total = qty * amount;
        }
        setInvoiceData((prev) => ({...prev, items}));
    }

    const calculateTotals = () => {
        const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0)
        const taxRate = Number(invoiceData.tax) || 0;
        const taxAmount = taxRate > 0 ? (subtotal * taxRate) / 100 : 0;
        const grandTotal = subtotal + taxAmount;
        return {subtotal, taxAmount, grandTotal};
    }

    const {subtotal, taxAmount, grandTotal} = calculateTotals();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData((prev) => ({
                    ...prev,
                    logo: reader.result
                }))
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if (!invoiceData.invoice.number) {
            const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
            setInvoiceData((prev) => ({
                ...prev,
                invoice: {...prev.invoice, number: randomNumber},
            }))
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault(); // Good practice for form submission
        console.log("Final Invoice Data:", invoiceData);
        // Here you would typically send the data to a server or generate a PDF
    }

    return (
        <div className="invoiceform container py-4">

            {/* Company logo */}
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label" style={{cursor: 'pointer'}}>
                        {/* FIX: Corrected typo from invoiceData.log to invoiceData.logo */}
                        <img src={invoiceData.logo ? invoiceData.logo : assets.upload_area} alt="upload" width={98}/>
                        <div>Click to upload your logo</div>
                    </label>
                    <input type="file"
                           name="logo"
                           id="image"
                           hidden
                           className="form-control"
                           accept="image/*"
                           onChange={handleLogoUpload}/>
                </div>
            </div>

            {/* ... other form sections are correct ... */}
            {/* Company info */}
            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company name"
                            onChange={(e) => handleChange("company", "name", e.target.value)}
                            value={invoiceData.company.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company phone number"
                            onChange={(e) => handleChange("company", "phone", e.target.value)}
                            value={invoiceData.company.phone}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company address"
                            onChange={(e) => handleChange("company", "address", e.target.value)}
                            value={invoiceData.company.address}
                        />
                    </div>
                </div>
            </div>
            {/* Billing section */}
            <div className="mb-4">
                <h5>Bill to</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={(e) => handleChange("billing", "name", e.target.value)}
                            value={invoiceData.billing.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone number"
                            onChange={(e) => handleChange("billing", "phone", e.target.value)}
                            value={invoiceData.billing.phone}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            onChange={(e) => handleChange("billing", "address", e.target.value)}
                            value={invoiceData.billing.address}
                        />
                    </div>
                </div>
            </div>
            {/* Ship to */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship to</h5>
                    <div className="form-check">
                        <input type="checkbox" className='form-check-input' id="sameAsBilling" onChange={handleSameAsBilling} />
                        <label htmlFor="sameAsBilling" className="form-check-label">
                            Same as Billing
                        </label>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={(e) => handleChange("shipping", "name", e.target.value)}
                            value={invoiceData.shipping.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone number"
                            onChange={(e) => handleChange("shipping", "phone", e.target.value)}
                            value={invoiceData.shipping.phone}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Shipping address"
                            onChange={(e) => handleChange("shipping", "address", e.target.value)}
                            value={invoiceData.shipping.address}
                        />
                    </div>
                </div>
            </div>
            {/* Invoice info */}
            <div className="mb-4">
                <h5>Invoice information</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            id="invoiceNumber"
                            value={invoiceData.invoice.number}
                            onChange={(e) => handleChange("invoice", "number", e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="invoiceDate"
                            onChange={(e) => handleChange("invoice", "date", e.target.value)}
                            value={invoiceData.invoice.date}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDueDate" className="form-label">Invoice Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="invoiceDueDate"
                            onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}
                            value={invoiceData.invoice.dueDate}
                        />
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
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Item Name"
                                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                    // FIX: Changed from invoiceData.items.name to item.name
                                    value={item.name}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    className="form-control"
                                    onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                    // FIX: Changed from invoiceData.items.quantity to item.qty
                                    value={item.qty}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    className="form-control"
                                    onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                    // FIX: Changed from invoiceData.items.amount to item.amount
                                    value={item.amount}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="0.00"
                                    // FIX: Changed from invoiceData.items.total to item.total and formatted it
                                    value={item.total.toFixed(2)}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                        <textarea className="form-control"
                                  placeholder="Description"
                                  value={item.description}
                                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        ></textarea>
                            {invoiceData.items.length > 1 && (
                                <button className="btn btn-outline-danger" type="button" onClick={() => deleteItem(index)}>
                                    <Trash2 size={18}/>
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
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Recipient name"
                            onChange={(e) => handleChange("account", "name", e.target.value)}
                            value={invoiceData.account.name}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="IBAN"
                            onChange={(e) => handleChange("account", "number", e.target.value)}
                            value={invoiceData.account.number}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Bank SWIFT"
                            onChange={(e) => handleChange("account", "SWIFT", e.target.value)}
                            value={invoiceData.account.SWIFT}
                        />
                    </div>
                </div>
            </div>

            {/* Total */}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100" style={{maxWidth: '400px'}}>
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">Tax Rate (%)</label>
                            <input
                                type="number"
                                id="taxInput"
                                className="form-control w-50 text-end"
                                placeholder="0"
                                onChange={(e) => setInvoiceData((prev) => ({...prev, tax: e.target.value}))}
                                value={invoiceData.tax}
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Tax amount</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
                <h5>Notes:</h5>
                <div className="w-100">
                    <textarea name="notes"
                              className="form-control"
                              rows={3}
                              value={invoiceData.notes}
                              onChange={(e) => setInvoiceData((prev) => ({...prev, notes: e.target.value}))}
                    ></textarea>
                </div>
            </div>

            {/* FIX: Added text and styling to the submit button */}
            <div className="text-end">
                <button className="btn btn-success" onClick={handleSubmit}>
                    Generate Invoice
                </button>
            </div>

        </div>
    )
}

export default InvoiceForm;