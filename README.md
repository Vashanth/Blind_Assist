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
 > Working directory :  Blind_Assist/Blind Assist v2/combo/
 
 In this version we have concentrated on transfer learning where we have retrained the mobilenet model to accomodate 3 classes. We have added 3 buttons to add 3 classes A,B and C respectively, we can target an object and take snapshots for corresponding classes by pressing the respective buttons, if we take 10-15 snaps of an object then it will start predicting class A,B and C correctly. In addition to predicting the 3 classes it parallely predicts the mobilenet pretrained classification and displays that in addition to this.  
   
 As this approach had to take snaps and deal with Document Object Model(DOM) in js, we had to make a website with js and html, then convert it into Progressive Web app(PWA) and convert the PWA to APK. We did not use React Native because it can't deal with DOM elements.
 
 To convert the website to PWA:
 * We have to add manifest.json file with main details about the app like app name and icon for the app and link it in html page
 * Next, we have to register a service worker
 * We’re using an async function for registering the ServiceWorker for easier to read code.
 * Ensure that the browser supports ServiceWorker before trying to register one.
 * Register the ServiceWorker with navigator.serviceWorker.register.
 * We can check these steps by opting for update on reload in Application tab in Developer tools
 * We can cache and serve static assets
 * To check whether cached content is served to the app, we have to go offline or opt for offline option in Application tab of Developer Tools
 To convert website to PWA : [Reference Link](https://vaadin.com/learn/tutorials/learn-pwa/turn-website-into-a-pwa) 
 
 The Deployed link of PWA : https://blind-assist.web.app/ (or) https://blind-assist.firebaseapp.com
 
 
 We can Add to Home Screen and it will get installed as an app too.  
 
 PWA to APK converter : [Link](https://appmaker.xyz/pwa-to-apk/)  
 
 To add more classes for transfer learning:
 * We have to n button html tags assuming we want n classes
 * Each button tag should have a unique id
 * We can give a custom id or use the uuid library to assign each button a unique id
 * Now we have to add js functionality to the buttons such that if we press a button it takes a snap for that respective class
 * We have to add event listeners for all the buttons, we can do this manually or loop through y reusing the code and reducing redundancy
 * The event listeners have to be triggered On click of the button
 * The trigger will call addExample function which takes the button id as a parameter which we had assigned in the front end
 * This addExample function is reusable, one function for all buttons
 * The classifier will predict a number between 0 to n-1 and we have to map it to the corresponding class
 * We can have a map or an array with the mappings of the predicted index to value
 * We can display the value of the predicted index and also pass it to the TTS module
 
 One issue with TTS module - speechSynthesis of js is it has a queue of what has to be uttered. The tf awaitframe calls the next frame in 16ms, so in a second it can accumulate 62 class names into the queue, so it was not uttering the latest class. Let us say i showed it class A in 1st second and class B in 2nd second, the model will utter B only after 62 times speaking 'Class A'.  The solution we came up with is, we introduced a delay of 700ms into the system before calling the next frame, so by this totally 716ms was the time before it called the next frame, so the queue was much shorter than before and it holded upto recentness of the image shown. But, increasing the delay greater than 700ms caused a scenario where it seemed like the page was lagging, but it was waiting the delay amount of time between predictions or taking snapshots. So one precaution we have to take while integrating TTS module is we have to find an optimum delay to wait before calling next frame. 
 
 



