export default function Input({ type, name, label, onChange }) {
    return (
        <div>
            <label className="form-label fw-bold" htmlFor={ name }>{ label }</label>
            <input onChange={onChange} name={ name } id={ name } className="form-control" type={type} />
        </div>
    )
}