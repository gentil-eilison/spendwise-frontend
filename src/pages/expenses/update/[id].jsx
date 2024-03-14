import { useEffect, useState } from "react"
import Link from "next/link"

import SpendWiseAPI from "@/api"

import Header from "@/components/Header/Header"
import NumberInput from "@/components/NumberInput/NumberInput"
import Input from "@/components/input/Input"
import Button from "@/components/button/Button"
import Select from "@/components/select/Select"
import Toast from "@/components/Toast/Toast"

export default function ExpensesUpdate({ categories, expense, categoryId }) {
    const [value, setValue] = useState(expense.value)
    const [date, setDate] = useState(expense.date)
    const [category, setCategory] = useState(categoryId)
    const [description, setDescription] = useState(expense.description)
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [showErrorToast, setShowErrorToast] = useState(false)

    async function handleFormSubmission(event) {
        event.preventDefault()
        const payload = {
            value,
            date,
            category: Number(category),
            description
        }
        const api = new SpendWiseAPI()
        const response = await api.updateExpense(expense.id, payload)
        if (response) {
            setShowSuccessToast(true)
        } else {
            setShowErrorToast(true)
        }

    }

    function handleValueInput(event) {
        setValue(event.currentTarget.value)
    }
    
    function handleDateInput(event) {
        setDate(event.currentTarget.value)
    }
    
    function handleDescriptionInput(event) {
        setDescription(event.currentTarget.value)
    }

    function handleCategoryInput(event) {
        setCategory(event.currentTarget.value)
    }

    function renderCategoriesOptions() {
        return (
            categories.map(category => {
                return <option key={category.id} value={`${category.id}`}>{category.name}</option>
            })
        )
    }

    return (
        <main className="vh-100 d-flex flex-column align-items-center justify-content-around">
            <Header />
            <form 
                className="shadow p-3 mb-5 bg-body-tertiary rounded d-flex flex-column justify-content-center align-items-center gap-4" 
                onSubmit={handleFormSubmission}>
                    <h2 className="text-success">
                        Update Expense <i className="bi bi-box-seam-fill"></i>
                    </h2>
                    <div className="input-group gap-4">
                        <NumberInput
                            required={true}
                            value={value}
                            name="value" label="Value" step="any" 
                            placeholder="3.50" onChange={handleValueInput} 
                        />
                        <Input 
                            required={true}
                            value={date} label="Date" type="date" name="date" 
                            onChange={handleDateInput} 
                        />
                    </div>
                    <div className="input-group gap-4">
                        <Select 
                            required={true}
                            value={category} label="Categories" name="category" 
                            onChange={handleCategoryInput}
                        >
                            { renderCategoriesOptions() }
                        </Select>
                        <Input 
                            required={true}
                            value={description} label="Description" type="text" 
                            name="description" onChange={handleDescriptionInput} 
                        />
                    </div>
                    <div className="d-flex justify-content-around w-100">
                        <Button id="addExpense" type="submit" color="btn-success">
                            Update <i className="bi bi-check-circle-fill"></i>
                        </Button>
                        <Link className="btn btn-warning text-black px-5" href="/">
                            Go Back <i className="bi bi-arrow-left-circle-fill"></i>
                        </Link>
                    </div>
            </form>
            { showSuccessToast ? (
                <Toast setShowToast={setShowSuccessToast} color="success">
                    Expense updated
                </Toast>
            ) : (
                <>
                </>
            ) }
            { showErrorToast ? (
                <Toast setShowToast={setShowErrorToast} color="danger">
                    An error ocurred in the server
                </Toast>
            ) : (
                <>
                </>
            ) }
        </main>
    )
}

async function getExpense(expenseId) {
    const api = new SpendWiseAPI()
    const response = await api.getExpense(expenseId)
    return response.data
}

export async function getServerSideProps(context) {
    const api = new SpendWiseAPI()
    const response = await api.getCategories()
    const expense = await getExpense(context.params.id)
    const categoryId = response.data.find(category => category.name === expense.category).id
    return { props: { categories: response.data, expense, categoryId} }
}