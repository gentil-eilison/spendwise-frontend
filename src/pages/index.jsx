import Head from "next/head";
import ExpensesTable from "@/components/expenses_table/ExpensesTable";
import SpendWiseAPI from "@/api";

export default function Home({ expenses }) {
  return (
    <>
      <Head>
        <title>SpendWise</title>
        <meta name="description" content="Spend your money in wiser way" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Your Expenses</h1>
        <ExpensesTable expenses={expenses} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const api = new SpendWiseAPI()
  const response = await api.getExpenses()
  return { props: { expenses: response.data } }
}