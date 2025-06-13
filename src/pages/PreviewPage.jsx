import {useContext, useRef, useState} from "react";
import button from "bootstrap/js/src/button.js";
import {templates} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import '../index.css'
import InvoicePreview from "../components/InvoicePreview.jsx";
import {deleteInvoice, saveInvoice} from "../service/invoiceService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Loader2} from "lucide-react";
import html2canvas from "html2canvas";
import {uploadInvoiceThumbnail} from "../service/cloudinaryService.js";
import {generatePdfFromElement} from "../util/pdfUtils.js";

const PreviewPage = () => {
    const previewRef = useRef();
    const {selectedTemplate, invoiceData, setSelectedTemplate, baseURL} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);

    const handleSaveAndExit = async () => {
        try{
            setLoading(true);
            const canvas = await html2canvas(previewRef.current,{
                scale: 2,
                useCORS: true,
                backgroundColor: "white",
                scrollY: -window.scrollY
            });
            const imageData = canvas.toDataURL("image/png")
            const thumbnailUrl = await  uploadInvoiceThumbnail(imageData);
            const payload = {
                ...invoiceData,
                thumbnailUrl: thumbnailUrl,
                template: selectedTemplate,
            }
            const response = await saveInvoice(baseURL, payload);
            if(response.status === 200){
                toast.success("Successfully updated invoice");
                navigate("/dashboard");
            }else{
                toast.error(response.statusText);
                throw new Error("Failed to update invoice");
            }
        }catch(e){
            console.log(e)
            toast.error(e.message)
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (!invoiceData.id) {
            toast.success("Invoice deleted successfully");
            navigate("/dashboard");
        }

        try {
            const response = await deleteInvoice(baseURL, invoiceData.id);
            if(response.status === 204){
                toast.success("Successfully deleted invoice");
                navigate("/dashboard");
            } else{
                toast.error("Unable to delete invoice");
            }
        }catch(e){
            toast.error("Failed to delete invoice", e.message);
        }
    }

    const handleDownloadPdf = async () => {
        if (!previewRef.current) return;

        try{
            setDownloading(true);
            await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`);
        }catch(e){
            toast.error('Failed to generate pdf', e.message)
        }finally {
            setDownloading(false);
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
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loading}>
                        {loading && <Loader2 className="me-2 spin-animation" size={18} />}
                        {loading ? "Saving..." : "Save and Exit"}</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete Invoice</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center" disabled={loading} onClick={handleDownloadPdf}>
                        {downloading && (
                            <Loader2 className="me-2 spin-animation" size={18} />
                        )}
                        {downloading ? "Downloading..." : "Download PDF"}</button>
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