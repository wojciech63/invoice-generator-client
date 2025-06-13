import {createContext, useState} from "react";

export const AppContext = createContext();

const baseURL = "http://localhost:8080/api";

export const initialInvoiceData = {
    title: "New Invoice",
    billing: {name: "", phone: "", address: ""},
    shipping: {name: "", phone: "", address: ""},
    invoice: {number: "", date: "", dueDate: ""},
    account: {name: "", number: "", SWIFT: ""},
    company: {name: "", phone: "", address: ""},
    tax: 0,
    notes: "",
    items: [
        {name: "", qty: "", amount: "", description: "", total: 0},
    ],
    logo: ""
};

export const AppContextProvider = ({ children }) => {

    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");

    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTemplate, setSelectedTemplate] = useState("template");

    const contextValue = {
        invoiceTitle, setInvoiceTitle,
        invoiceData, setInvoiceData,
        selectedTemplate, setSelectedTemplate,
        initialInvoiceData,
        baseURL
    }

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}