import Link from "next/link"

import SpendWiseAPI from "@/api"

export default function ExpenseItem({ expense }) {
    function getFormattedDate() {
        const [year, month, day] = expense.date.split("-")
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString()
    }

    return (
        <>
            <span>{ expense.description } { expense.value } { expense.currency }</span>
            <span className="d-flex gap-3">
                <span>
                    { getFormattedDate() } { expense.category } 
                </span>
            </span>
        </>
    )
}