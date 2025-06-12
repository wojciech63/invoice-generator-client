import {forwardRef} from "react";
import {formatInvoiceData} from "../util/formatInvoiceData.js";

const InvoicePreview = forwardRef(({invoiceData, template}, ref) => {
    const formattedData = formatInvoiceData(invoiceData);

    return (
        <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
            Render PDF
        </div>
    )
});

export default InvoicePreview;