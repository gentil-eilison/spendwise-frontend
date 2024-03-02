import ExpenseItem from "../expense_item/ExpenseItem"

export default function ExpensesTable({ expenses }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                { expenses.map(expense => {
                    return <ExpenseItem key={expense.id} expense={expense}/>
                }) }
            </tbody>
        </table>
    )
}