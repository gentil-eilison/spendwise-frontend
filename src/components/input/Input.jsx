export default function Input({ type, name, label }) {
    return (
        <div>
            <label className="form-label fw-bold" htmlFor={ name }>{ label }</label>
            <input name={ name } id={ name } className="form-control" type={type} />
        </div>
    )
}