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

    async createExpense(payload) {
        const response = this.client.post("/expenses/", payload).then(
            response => {return response}
        ).catch(error => {
            if (error.response) {
                return
            }
        })
        return response
    }

    getExpenses(query_params) {
        return this.client.get("/expenses/", {
            params: query_params
        })
    }
}