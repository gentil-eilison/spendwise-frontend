export default function NumberInput({ name, label, onChange, placeholder, step }) {
    return (
        <div>
            <label className="form-label fw-bold" htmlFor={ name }>{ label }</label>
            <input step={step} placeholder={ placeholder } onChange={ onChange } name={ name } id={ name } className="form-control" type="number" />
        </div>
    )
}