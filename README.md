
# Amnil Internship Final Assessment Task

This document outlines the final assessment task completed during the Amnil Internship. The project involves the development of a React Native application with several key features aimed at providing a comprehensive user experience. The task demonstrates proficiency in mobile app development, API integration, state management, and user interface design.

## Features

- **Splash Screen**: Designed with minimal animation and logo.
  <img src="./src/assets/screenshots/Splash.png" alt="Splash Screen" width="200" style="margin: 10px;">
- **Authentication**: Integrated login functionality with API, token storage using AsyncStorage, and conditional navigation.
  <img src="./src/assets/screenshots/login.png" alt="Login Screen" width="200" style="margin: 10px;">
- **API Instance**: Configured for API calls with Redux integration.
- **Navigators**: Implemented Bottom Tab Navigator and Drawer Navigator with all required screens and functionalities.
- **Screens**: Developed Home, Search, Cart, Account, Product Detail, Todos, and Post screens with comprehensive features.
- **Logout**: Added context-based message display and implemented refresh token handling.
  <img src="./src/assets/screenshots/toast.png" alt="Logout Screen" width="200" style="margin: 10px;">

### Additional Screenshots

<div style="display: flex; flex-wrap: wrap;">
    <img src="./src/assets/screenshots/Home.png" alt="Home Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/search.png" alt="Search Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/cart.png" alt="Cart Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/TODO.png" alt="Todo Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/FiltersTODO.png" alt="Todo Screen filter" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/Cart1.png" alt="Empty Cart Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/profile.png" alt="Profile Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/Drawer.png" alt="Drawer Navigator" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/contact.png" alt="Call Screen" width="200" style="margin: 10px;">
    <img src="./src/assets/screenshots/email.png" alt="Mail Screen" width="200" style="margin: 10px;">
</div>



# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
