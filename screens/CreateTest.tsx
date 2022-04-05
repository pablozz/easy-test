import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { RootStackParamList } from "../navigation";
import {
  QuestionType,
  questionTypesArray,
  questionTypesObject,
} from "../constants/questionTypes";
import { Urls } from "../constants/urls";

export type CreateTestProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateTest"
>;

export interface IQuestion {
  text: string;
  answers: string[] | null;
  type: string;
}

const CreateTest = ({ navigation }: CreateTestProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      text: "",
      answers: null,
      type: "open",
    },
  ]);
  const [questionType, setQuestionType] = useState<QuestionType>(
    questionTypesObject.open
  );

  const submitTest = async () => {
    const test = {
      name,
      description,
      questions,
    };
    return await fetch(Urls.DEV_API + "/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    }).then((res) => res.ok);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create test</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        defaultValue={name}
        onChangeText={(newText) => setName(newText)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        defaultValue={description}
        onChangeText={(newText) => setDescription(newText)}
      />
      {questions.map((question, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            placeholder="Question"
            defaultValue={question.text}
            onChangeText={(newText) =>
              setQuestions(() => {
                questions[index].text = newText;
                return questions;
              })
            }
          />
          {question.answers !== null ? (
            <View style={styles.indent}>
              {question.answers.map((answer, answerIndex) => (
                <TextInput
                  key={answerIndex}
                  style={styles.input}
                  placeholder="Answer"
                  defaultValue={answer}
                  onChangeText={(newText) =>
                    setQuestions(() => {
                      questions[index].answers![answerIndex] = newText;
                      return questions;
                    })
                  }
                />
              ))}
              <Button
                onPress={() =>
                  setQuestions([
                    ...questions.slice(0, index),
                    {
                      text: questions[index].text,
                      answers: [...(questions[index].answers ?? []), ""],
                      type: questions[index].type,
                    },
                  ])
                }
                title="Add Answer"
              />
            </View>
          ) : null}
        </View>
      ))}
      <Picker
        selectedValue={questionType.type}
        onValueChange={(itemValue, itemIndex) => {
          setQuestionType(questionTypesArray[itemIndex]);
        }}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        {questionTypesArray.map((questionType: QuestionType, index) => (
          <Picker.Item
            label={questionType.name}
            value={questionType.type}
            key={index}
          />
        ))}
      </Picker>
      <Button
        onPress={() =>
          setQuestions([
            ...questions,
            {
              text: "",
              answers: questionType.answers ? [] : null,
              type: questionType.type,
            },
          ])
        }
        title="Add Question"
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => {
            console.log(await submitTest());
          }}
          title="Submit"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4,
    fontSize: 20,
  },
  picker: {
    fontSize: 15,
    borderWidth: 1,
  },
  pickerItem: {
    fontSize: 2,
  },
  indent: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default CreateTest;
