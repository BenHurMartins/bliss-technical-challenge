# bliss-technical-challenge

This is the app for bliss technical challenge.

- First step to run this app is to setup the react-native development environment, available [here](https://reactnative.dev/docs/environment-setup).

- Clone the repository.

- Execute:
```
npm i
```

- Then execute command, depending on the OS:
```
react-native run-ios
```
or
```
react-native run-android
```
## DeepLinking
To execute the links (deep linking in mobile) redirects we need to use the prefix "bliss", like the example bellow:


iOS:
- Open Safari
- In the address bar type: bliss://xxxxxxx.xxxxxxx/questions/QUESTION_ID

Android: 
- Open terminal with the emulator already running and installed app
- use the command: 
```
npx uri-scheme open bliss://xxxxxxx.xxxxxxx/questions/QUESTION_ID --android


Technologies applied:
- React Hooks for: state management and navigation,
- Typescript in 62% of the app, and Javascript in 3%, the others 35% are assets files, jsons and native language.
- Axios
- React Navigation to manage the Routes

 *This app is not suitable for Expo, it is a bare react-native app.*
