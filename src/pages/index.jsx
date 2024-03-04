import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import SpendWiseAPI from "@/api";

import ExpenseItem from "@/components/expense_item/ExpenseItem";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import Header from "@/components/Header/Header";

export default function Home({ categories }) {
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [expenses, setExpenses] = useState([])

  function getExpenses() {
    const api = new SpendWiseAPI()
    api.getExpenses({ category, date }).then(response => setExpenses(response.data))
  }

  useEffect(() => {
    getExpenses()
  }, [])

  function handleCategoryFilterInput(event) {
    setCategory(event.currentTarget.value)
  }

  function handleDateFilterInput(event) {
    setDate(event.currentTarget.value)
  }

  function renderExpenses() {
    return expenses.map(expense => {
      return (
        <ExpenseItem key={expense.id} expense={expense}/>
      )
    })
  }

  function renderCategoriesOptions() {
    return categories.map(category => {
      return <option key={category.id} value={`${ category.id }`}>{ category.name }</option>
    })
  }

  return (
    <>
      <Head>
        <title>SpendWise</title>
        <meta name="description" content="Spend your money in wiser way" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="d-flex flex-column align-items-center justify-content-around gap-4">
        <Header />
        <section className="w-75">
          <p className="text-success fs-2 fw-bold">Filters <i className="bi bi-funnel-fill"></i></p>
          <div className="d-flex gap-4 align-items-end">
            <Select onChange={handleCategoryFilterInput} name="category" label="Category">
              { renderCategoriesOptions() }
            </Select>
            <Input onChange={handleDateFilterInput} type="date" name="date" label="Date" />
            <Button onClick={getExpenses} color="btn-success" type="button">Filter</Button>
            <Button color="btn-warning" type="button">Clear Filters</Button>
          </div>
        </section>
        <section className="d-flex flex-column w-50">
          <h2 className="text-center">Total Amount: </h2>
          <ul className="list-group w-100">
            { renderExpenses() }
          </ul>
        </section>
        <Link className="btn btn-success" href="/expenses/create">Add Expense <i className="bi bi-plus-circle-fill"></i></Link>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const api = new SpendWiseAPI()
  const response = await api.getCategories()
  return { props: { categories: response.data } }
}