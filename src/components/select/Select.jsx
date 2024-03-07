export default function Select({ name, label, children, onChange, value, required }) {
    return (
        <div>
            <label htmlFor={ name } className="form-label fw-bold">{ label }</label>
            <select
                required={required}
                defaultValue={value} onChange={onChange} name={ name } 
                id={ name } aria-label={ label } className="form-select"
            >
                { children }
            </select>
        </div>
    )
}