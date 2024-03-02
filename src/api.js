import axios from "axios";

export default class SpendWiseAPI {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_SPENDWISE_API_BASE_URL,
            timeout: 1000,
        })
    }

    getCategories() {
        return this.client.get("/categories/")
    }

    createExpense(payload) {
        return this.client.post("/expenses/", payload)
    }
}