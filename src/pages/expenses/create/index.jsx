import { useState } from "react"

import SpendWiseAPI from "@/api"

import Header from "@/components/Header/Header"
import NumberInput from "@/components/NumberInput/NumberInput"
import Input from "@/components/input/Input"
import Button from "@/components/button/Button"
import Select from "@/components/select/Select"
import Toast from "@/components/Toast/Toast"

export default function ExpensesCreate({ categories }) {
    const [value, setValue] = useState(0)
    const [date, setDate] = useState()
    const [category, setCategory] = useState(1)
    const [description, setDescription] = useState("")
    const [showToast, setShowToast] = useState(false)

    function handleFormSubmission(event) {
        event.preventDefault()
        const payload = {
            value,
            date,
            category: Number(category),
            description
        }
        const api = new SpendWiseAPI()
        api.createExpense(payload)
        setShowToast(true)
        event.currentTarget.reset()
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
            <form className="shadow p-3 mb-5 bg-body-tertiary rounded d-flex flex-column justify-content-center align-items-center gap-4" onSubmit={handleFormSubmission}>
                <h2 className="text-success">New Expense <i className="bi bi-box-seam-fill"></i></h2>
                <div className="input-group gap-4">
                    <NumberInput 
                        name="value" label="Value" step="any" 
                        placeholder="3.50" onChange={handleValueInput} 
                    />
                    <Input label="Date" type="date" name="date" onChange={handleDateInput} />
                </div>
                <div className="input-group gap-4">
                    <Select label="Categories" name="category" onChange={handleCategoryInput}>
                        { renderCategoriesOptions() }
                    </Select>
                    <Input label="Description" type="text" name="description" onChange={handleDescriptionInput} />
                </div>
                <Button id="addExpense" type="submit" color="btn-success">Add <i className="bi bi-plus-circle-fill"></i></Button>
            </form>
            { showToast ? (
                <Toast setShowToast={setShowToast} color="success">Expense created successfully</Toast>
            ) : (
                <>
                </>
            ) }
        </main>
    )
}

export async function getServerSideProps() {
    const api = new SpendWiseAPI()
    const response = await api.getCategories()
    return { props: { categories: response.data } }
}