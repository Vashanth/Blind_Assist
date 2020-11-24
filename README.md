## Blind-Assist
React Native App  
To set up the React Native App environment we have to:
* install Android Studio
* install the Android SDK
* Configure the ANDROID_HOME environment variable
* Add platform-tools to Path
* To install all the dependencies we have to go to the root folder and call the command prompt from that directory and type 'npm install'  
* Then we have to connect the charging cable from phone to laptop
* Switch on USB debugging in Developer options in the phone
* Turn off MIUI optimisations if it is a Redmi phone
* To check whether the phone is connected and ready to install the app type 'adb devices' in the cmd and if our device is listed then connection is successful
* At first it will ask for a RSA configuration key acceptance, we have to allow in phone to start working
* To run the app in phone : we have to type 'react-native run-android' in cmd 
* This will open a node cmd where we can see the debugging screen and at first the process will be slow to install in phone, but later versions will install quicker  
 React-Native docs : [Reference Link](https://reactnative.dev/docs/environment-setup)
 
 
 ## Blind Assist v2
 In this version we have concentrated on transfer learning where we have retrained the mobilenet model to accomodate 3 classes. We have added 3 buttons to add 3 classes A,B and C respectively, we can target an object and take snapshots for corresponding classes by pressing the respective buttons, if we take 10-15 snaps of an object then it will start predicting class A,B and C correctly.  
   
 As this approach had to take snaps and deal with Document Object Model(DOM) in js, we had to make a website with js and html, then convert it into Progressive Web app(PWA) and convert the PWA to APK. We did not use React Native because it can't deal with DOM elements.



