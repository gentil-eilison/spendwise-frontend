import Head from "next/head";
import Link from "next/link";
import { Component } from "react";

import SpendWiseAPI from "@/api";

import ExpenseItem from "@/components/ExpenseItem/ExpenseItem";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Header from "@/components/Header/Header";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "",
      date: "",
      expenses: [],
      totalAmount: 0
    }
  }

  getExpenses = () => {
    const api = new SpendWiseAPI()
    api.getExpenses({
      category: this.state.category,
      date: this.state.date
    }).then(response => this.setState({ expenses: response.data }, () => this.getTotalAmount()))
  }

  getTotalAmount = () => {
    const totalAmount = this.state.expenses.reduce((accumulator, currentExpense) => {
      return accumulator + Number(currentExpense.value)
    }, 0)
    this.setState({ totalAmount })
  }

  componentDidMount() {
    this.getExpenses()
  }

  handleCategoryFilterInput = (event) => {
    this.setState({ category: event.currentTarget.value})
  }

  handleDateFilterInput = (event) => {
    this.setState({ date: event.currentTarget.value })
  }

  handleFilter = () => {
    this.getExpenses()
  }

  handleExpensesDelete = (updatedExpenses) => {
    this.setState({ expenses: updatedExpenses }, (previousState) => {
      this.getTotalAmount()
    })
  }

  renderExpenses = () => {
    return this.state.expenses.map(expense => {
      return (
          <ExpenseItem 
            updateExpensesHandler={this.handleExpensesDelete} 
            expenses={this.state.expenses} key={expense.id} 
            expense={expense}
          />
      )
    })
  }

  renderCategoriesOptions = () => {
    return this.props.categories.map(category => {
      return <option key={category.id} value={`${ category.id }`}>{ category.name }</option>
    })
  }

  clearFilters = () => {
    this.setState({ date: "" }, (previousState) => {
      this.setState({ category: "" }, (previousState) => {
        this.getExpenses()
        this.getTotalAmount()
      })
    })
  }

  render() {
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
            <p className="text-success fs-2 fw-bold">
              Filters <i className="bi bi-funnel-fill"></i>
            </p>
            <div className="d-flex gap-4 align-items-end">
              <Select 
                value={this.state.category} 
                onChange={this.handleCategoryFilterInput} name="category" label="Category">
                  { this.renderCategoriesOptions() }
              </Select>
              <Input 
                value={this.state.date} 
                onChange={this.handleDateFilterInput} 
                type="date" name="date" label="Date" 
              />
              <Button 
                onClick={this.handleFilter} color="btn-success" type="button">
                  Filter
              </Button>
              <Button 
                onClick={this.clearFilters} color="btn-warning" type="button">
                  Clear Filters
              </Button>
            </div>
          </section>
          <section className="d-flex flex-column w-50">
            <h2 className="text-center">Total Amount: { this.state.totalAmount } BRL</h2>
            <ul className="list-group w-100">
              { this.renderExpenses() }
            </ul>
          </section>
          <Link className="btn btn-success" href="/expenses/create">
            Add Expense <i className="bi bi-plus-circle-fill"></i>
          </Link>
        </main>
      </>
    )
  }
}

export async function getServerSideProps() {
  const api = new SpendWiseAPI()
  const response = await api.getCategories()
  return { props: { categories: response.data } }
}