import style from "@/components/button/Button.module.css"

export default function Button({ type, color, children, id, onClick }) {
    return (
        <button 
            onClick={onClick} id={id} type={type} 
            className={`btn ${color} ${style.customButton}`}>
                { children }
        </button>
    )
}