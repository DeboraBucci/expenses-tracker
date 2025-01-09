import { Text, View } from "react-native";

function ExpensesSummary({ period, expenses }) {
  const expensesSum = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <View>
      <Text>{period}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
