import { useState } from "react"
import axios from "axios"

export default function ExpensesCreate({ categories }) {
    const [value, setValue] = useState(0)
    const [date, setDate] = useState()
    const [category, setCategory] = useState(1)
    const [description, setDescription] = useState("")

    function handleFormSubmission(event) {
        event.preventDefault()
        const request_body = {
            value,
            date,
            category,
            description
        }
        axios.post(`${process.env.NEXT_PUBLIC_SPENDWISE_API_BASE_URL}/expenses/`, request_body)
    }

    function handleValueInput(event) {
        setValue(event.currentTarget.value)
    }

    function handleDateInput(event) {
        setDate(event.currentTarget.value)
    }

    function renderCategories() {
        return (
            <select type="number" name="category" id="category">
                {categories.map(category => {
                    return <option key={category.id} value={categories.id}>{category.name}</option>
                })}
            </select>
        )
    }

    function handleDescriptionInput(event) {
        setDescription(event.currentTarget.value)
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SPENDWISE_API_BASE_URL}/categories/`)
    return { props: { categories: response.data } }
}