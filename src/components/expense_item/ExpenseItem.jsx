export default function ExpenseItem({ expense }) {
    function getFormattedDate() {
        const [year, month, day] = expense.date.split("-")
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString()
    }

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span>{ expense.description } { expense.value } { expense.currency }</span>
            <span>{ getFormattedDate() } { expense.category }</span>
        </li>
    )
}