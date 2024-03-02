import { useState } from "react"
import SpendWiseAPI from "@/api"

export default function ExpensesCreate({ categories }) {
    const [value, setValue] = useState(0)
    const [date, setDate] = useState()
    const [category, setCategory] = useState(1)
    const [description, setDescription] = useState("")

    function handleFormSubmission(event) {
        event.preventDefault()
        const payload = {
            value,
            date,
            category,
            description
        }
        const api = new SpendWiseAPI()
        api.createExpense(payload)
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

    function renderCategories() {
        return (
            <select onChange={handleCategoryInput} type="number" name="category" id="category">
                {categories.map(category => {
                    return <option key={category.id} value={`${category.id}`}>{category.name}</option>
                })}
            </select>
        )
    }

    return (
        <main>
            <form onSubmit={handleFormSubmission}>
                <input 
                    onChange={handleValueInput} type="number" 
                    name="value" id="value" placeholder="3.50" step="any" 
                />
                <input 
                    onChange={handleDateInput} type="date" name="date" id="date" 
                />
                {renderCategories()}
                <input 
                    onChange={handleDescriptionInput} type="text" name="description" 
                    id="description" placeholder="New toy for Jimmy"
                />
                <button type="submit">Add</button>
            </form>
        </main>
    )
}

export async function getServerSideProps() {
    const api = new SpendWiseAPI()
    const response = await api.getCategories()
    return { props: { categories: response.data } }
}