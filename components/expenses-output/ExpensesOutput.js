import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={expensesPeriod} />
      {expenses.length > 0 && <ExpensesList expenses={expenses} />}
      {expenses.length === 0 && (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
