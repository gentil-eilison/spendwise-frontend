import Link from "next/link"
import { Component } from "react"

import SpendWiseAPI from "@/api"

export default class ExpenseItem extends Component {
    constructor(props) {
        super(props)
    }
    
    getFormattedDate = () => {
        const [year, month, day] = this.props.expense.date.split("-")
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString()
    }

    handleExpenseDelete = async () => {
        const api = new SpendWiseAPI()
        await api.deleteExpense(this.props.expense.id)
        api.getExpenses().then(response => this.props.updateExpensesHandler(response.data))
    }

    render() {
        return (
            <li className="list-group-item d-flex justify-content-between">
                <span>
                    { this.props.expense.description } { this.props.expense.value } 
                    { this.props.expense.currency }
                </span>
                <span className="d-flex gap-3">
                    <span>
                        { this.getFormattedDate() } { this.props.expense.category } 
                    </span>
                    <span className="d-flex gap-2">
                        <Link href={`/expenses/update/${this.props.expense.id}/`}>
                            <i className="bi bi-pencil-fill"></i>
                        </Link>
                        <Link onClick={this.handleExpenseDelete} href="">
                            <i className="bi bi-trash2-fill"></i>
                        </Link>
                    </span>
                </span>
            </li>
        )
    } 
}