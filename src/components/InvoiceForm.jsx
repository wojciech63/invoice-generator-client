import {assets} from "../assets/assets.js";

const InvoiceForm = () => {
    return (
        <div className="invoiceform container py-4">

            {/* Company logo */}
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img src={assets.upload_area} alt="upload" width={98}/>
                    </label>
                    <input type="file" name="logo" id="image" hidden className="form-control" accept="image/*" />
                </div>
            </div>
            {/* Company info */}
            <div className="mb-4"></div>
            {/* Billing section */}
            <div className="mb-4"></div>
            {/* Ship to */}
            <div className="mb-4"></div>
            {/* Invoice info */}
            <div className="mb-4"></div>
            {/* Item details */}
            <div className="mb-4"></div>
            {/* Bank details */}
            <div className="mb-4"></div>
            {/* Total */}
            <div className="mb-4"></div>
            {/* Notes */}
            <div className="mb-4"></div>

        </div>
    )
}

export default InvoiceForm;