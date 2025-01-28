import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitBtnLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? +defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      setInputs((prevInputs) => {
        return {
          amount: {
            value: prevInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: prevInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: prevInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={{ flex: 1 }}
          invalid={!inputs.amount.isValid}
          inputProps={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />

        <Input
          label="Date"
          style={{ flex: 1 }}
          invalid={!inputs.date.isValid}
          inputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        inputProps={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input data, please check it!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={submitHandler}>{submitBtnLabel}</Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 12,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginBottom: 16,
  },
});
