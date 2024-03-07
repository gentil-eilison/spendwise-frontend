export default function NumberInput({ name, label, onChange, placeholder, step, value, required }) {
    return (
        <div>
            <label className="form-label fw-bold" htmlFor={ name }>{ label }</label>
            <input
                required={required}
                value={value} step={step} placeholder={ placeholder } 
                onChange={ onChange } name={ name } id={ name } 
                className="form-control" type="number" 
            />
        </div>
    )
}