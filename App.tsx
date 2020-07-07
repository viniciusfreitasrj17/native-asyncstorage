import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  AsyncStorage,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";

const Content: React.FC = () => {
  const [content, setContent] = useState("none");
  const [value, setValue] = useState("");

  useEffect(() => {
    async function getInformation() {
      try {
        const rec = await AsyncStorage.getItem("@VALUE");

        if (rec !== null) {
          setContent(rec);
        } else {
          setContent((element) => element);
        }
      } catch (e) {
        Alert.alert("Error", e);
      }
    }

    getInformation();
  });

  const setInformation = async () => {
    try {
      await AsyncStorage.setItem("@VALUE", value);
      Keyboard.dismiss();
      Alert.alert("Sucesso", "Dado salve com sucesso");
    } catch (e) {
      Alert.alert("Error", e);
    }
  };

  const deleteInformation = async () => {
    try {
      await AsyncStorage.removeItem("@VALUE");
      Alert.alert("Sucesso", "Dado deletado com sucesso");
    } catch (e) {
      Alert.alert("Error", e);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.containerContent}>
        <Text style={styles.text}>Content</Text>
        <View style={styles.containerContentInformation}>
          <Text style={[styles.text, styles.textInformation]}> {content} </Text>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={deleteInformation}
          >
            <Text style={styles.textDelete}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerRegister}>
        <Text style={styles.text}>Register</Text>
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          style={styles.textInput}
        />
        <Button onPress={setInformation} title="Gravar" />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.androidSafeView}>
      <View style={styles.container}>
        <Content />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerContent: {
    borderBottomWidth: 1,
    width: 270,
    alignItems: "center",
  },
  containerRegister: {
    width: "50%",
    alignItems: "center",
  },
  containerContentInformation: {
    flexDirection: "row",
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
  },
  textInformation: {
    marginHorizontal: 7,
  },
  textInput: {
    height: 50,
    width: 200,
    borderWidth: 1,
    padding: 2,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonDelete: {
    borderBottomWidth: 1,
    backgroundColor: "#f00",
    paddingHorizontal: 5,
    paddingVertical: 0,
    justifyContent: "center",
    marginHorizontal: 7,
    height: 25,
  },
  textDelete: {
    fontSize: 12,
  },
});
