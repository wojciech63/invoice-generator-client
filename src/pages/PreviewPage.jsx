import {useContext, useRef, useState} from "react";
import button from "bootstrap/js/src/button.js";
import {templates} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import '../index.css'
import InvoicePreview from "../components/InvoicePreview.jsx";

const PreviewPage = () => {
    const previewRef = useRef();
    const {selectedTemplate, invoiceData, setSelectedTemplate, baseURL} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleSaveAndExit = async () => {
        try{
            setLoading(true);
            //TODO: create thumbnail url
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">

            {/* Action buttons */}
            <div className="d-flex flex-column align-items-center mb-4 gap-3">

                {/* List of template buttons */}
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({id, label}) => (
                        <button
                            key={id}
                            className={`btn btn-sm rounded-pill p-2 ${
                                selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}`}
                            onClick={() => setSelectedTemplate(id)}
                            style={{minWidth: "100px", height: "38px"}}
                        >{label}</button>
                    ))}
                </div>

                {/* List of action buttons */}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center">Save and Exit</button>
                    <button className="btn btn-danger">Delete Invoice</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                    <button className="btn btn-info">Send Email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
                </div>

            </div>

            {/* Display the invoice preview */}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">

                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                </div>

            </div>

        </div>
    )
}

export default PreviewPage;