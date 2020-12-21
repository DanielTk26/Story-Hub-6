import * as React from "react";
import {Image,View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback,StyleSheet,Alert,ToastAndroid} from "react-native";
import firebase from "firebase";
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        if (response) {
          this.props.navigation.navigate("WriteStory");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Platform.OS === "ios"
              ? Alert.alert("User doesn't exist")
              : ToastAndroid.show("User doesn't exist", ToastAndroid.SHORT);
            console.log("doesn't exist");
            break;
          case "auth/invalid-email":
            Platform.OS === "ios"
              ? Alert.alert("Incorrect email or password")
              : ToastAndroid.show(
                  "Incorrect email or password",
                  ToastAndroid.SHORT
                );
            console.log("invalid");
            break;
        }
      }
    } else {
      Platform.OS === "ios"
        ? Alert.alert("Enter Email Address and Password")
        : ToastAndroid.show(
            "Enter Email Address and Password",
            ToastAndroid.SHORT
          );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ marginTop: 20, alignItems: "center" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <View>
              <Image
                source={require("../assets/read.png")}
                style={{ width: 200, height: 200 }}
              />
              <Text style={{ textAlign: "center", fontSize: 30 }}>Story Hub</Text>
            </View>
            <View>
              <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />
              <TextInput
                style={styles.loginBox}
                placeholder="enter password"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 90,
                  borderWidth: 1,
                  marginTop: 20,
                  paddingTop: 5,
                  borderRadius: 7,
                }}
                onPress={() => {
                  this.login(this.state.emailId, this.state.password);
                }}
              >
                <Text style={{ textAlign: "center" }}>Login to your Account</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
});