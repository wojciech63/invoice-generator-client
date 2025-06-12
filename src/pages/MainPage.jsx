import { useState } from "react";
import { PencilIcon } from "lucide-react";
import InvoiceForm from "../components/InvoiceForm.jsx";
import TemplateGrid from "../components/TemplateGrid.jsx";

const MainPage = () => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState("Invoice Generator");

    const handleTitleChange = (e) => setTitle(e.target.value);

    return (
        <div className="mainpage container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                {/* Title bar */}
                <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                className="form-control me-2"
                                autoFocus
                                value={title}
                                onChange={handleTitleChange}
                                onBlur={() => setIsEditingTitle(false)} // Exit edit mode on blur
                            />
                        ) : (
                            <h5 className="mb-0 me-2">
                                {title}
                                <button
                                    className="btn btn-sm p-0 border-0 bg-transparent"
                                    onClick={() => setIsEditingTitle(true)} // Toggle edit mode
                                >
                                    <PencilIcon className="text-primary" size={20} />
                                </button>
                            </h5>
                        )}
                    </div>
                </div>

                {/* Invoice form and template grid */}
                <div className="row g-4 align-items-stretch">
                    {/* Invoice form */}
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <InvoiceForm />
                        </div>
                    </div>
                    {/* Template grid */}
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <TemplateGrid/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
