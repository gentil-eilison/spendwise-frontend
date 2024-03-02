export default function ExpenseItem({ expense }) {
    function getFormattedDate() {
        const [year, month, day] = expense.date.split("-")
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString()
    }

    return (
        <tr>
            <td>{ expense.description }</td>
            <td>{ expense.value }</td>
            <td>{ getFormattedDate() }</td>
            <td>{ expense.category }</td>
        </tr>
    )
}