import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2021-01-05"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 5.23,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "Book A",
    amount: 14.0,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Book B",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} period={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
