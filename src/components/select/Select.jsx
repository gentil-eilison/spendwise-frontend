export default function Select({ name, label, children, onChange }) {
    return (
        <div>
            <label htmlFor={ name } className="form-label fw-bold">{ label }</label>
            <select onChange={onChange} name={ name } id={ name } aria-label={ label } className="form-select">
                { children }
            </select>
        </div>
    )
}