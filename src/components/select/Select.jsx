export default function Select({ name, label, children }) {
    return (
        <div>
            <label htmlFor={ name } className="form-label fw-bold">{ label }</label>
            <select name={ name } id={ name } aria-label={ label } className="form-select">
                { children }
            </select>
        </div>
    )
}