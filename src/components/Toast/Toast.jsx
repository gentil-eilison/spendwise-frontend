import { useState } from "react"

export default function Toast({ children, color, setShowToast }) {
    function closeToast() {
        setShowToast(false)
    }

    return (
        <div className={`"toast align-items-center text-bg-primary border-0" bg-${color} px-2 py-3 rounded`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    { children }
                </div>
                <button 
                    onClick={closeToast} type="button" 
                    className="btn-close btn-close-white me-2 m-auto" 
                    data-bs-dismiss="toast" aria-label="Close">
                </button>
            </div>
        </div>      
    )
}