import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { RootStackParamList } from "../navigation";
import {
  QuestionType,
  questionTypesArray,
  questionTypesObject,
} from "../constants/questionTypes";
import { Urls } from "../constants/urls";
import Input from "../components/Input";

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
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [questionType, setQuestionType] = useState<QuestionType>(
    questionTypesObject.open
  );

  const submitTest = async (): Promise<string> => {
    const test = {
      name,
      description,
      questions,
    };
    const response = await fetch(Urls.DEV_API + "/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    }).then((res) => res.json());
    return response.code;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create test</Text>
      <Input
        style={styles.input}
        placeholder="Name"
        defaultValue={name}
        onChangeText={(newText: string) => setName(newText)}
      />
      <Input
        style={styles.input}
        placeholder="Description"
        defaultValue={description}
        onChangeText={(newText: string) => setDescription(newText)}
      />
      {questions.map((question, index) => (
        <View key={index}>
          <View style={styles.questionWrap}>
            <Input
              style={styles.questionInput}
              placeholder="Question"
              defaultValue={question.text}
              onChangeText={(newText: string) =>
                setQuestions(() => {
                  questions[index].text = newText;
                  return questions;
                })
              }
            />
            <Button
              onPress={() =>
                setQuestions([
                  ...questions.slice(0, index),
                  ...questions.slice(index + 1, questions.length),
                ])
              }
              title="X"
            />
          </View>
          {question.answers !== null ? (
            <View style={styles.indent}>
              {question.answers.map((answer, answerIndex) => (
                <View key={answerIndex} style={styles.answerWrap}>
                  <Input
                    style={styles.input}
                    placeholder="Answer"
                    defaultValue={answer}
                    onChangeText={(newText: string) =>
                      setQuestions(() => {
                        questions[index].answers![answerIndex] = newText;
                        return questions;
                      })
                    }
                  />
                  <Button
                    onPress={() => {
                      setQuestions([
                        ...questions.slice(0, index),
                        {
                          text: questions[index].text,
                          answers: [
                            ...questions[index].answers!.slice(0, answerIndex),
                            ...questions[index].answers!.slice(answerIndex + 1),
                          ],
                          type: questions[index].type,
                        },
                        ...questions.slice(index + 1),
                      ]);
                    }}
                    title="X"
                  />
                </View>
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
                    ...questions.slice(index + 1),
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
            const code: string = await submitTest();
            navigation.navigate("ViewCode", { code });
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
    paddingHorizontal: 24,
    paddingVertical: 32,
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
  questionInput: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4,
    fontSize: 20,
    width: "95%",
  },
  answerInput: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4,
    fontSize: 20,
    width: "95%",
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
  questionWrap: {
    display: "flex",
    flexDirection: "row",
  },
  answerWrap: {
    display: "flex",
    flexDirection: "row",
  },
});

export default CreateTest;
