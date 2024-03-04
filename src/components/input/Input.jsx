export default function Input({ type, name, label, onChange, placeholder, value }) {
    return (
        <div>
            <label className="form-label fw-bold" htmlFor={ name }>{ label }</label>
            <input value={value} placeholder={ placeholder } onChange={ onChange } name={ name } id={ name } className="form-control" type={type} />
        </div>
    )
}