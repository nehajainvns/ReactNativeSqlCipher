Steps to follow :

1) Clone the project
2) Add a folder node_modules
3) Clone project react-native-sqlcipher-storage from https://github.com/axsy-dev/react-native-sqlcipher-storage
Unzip and copy the folder to ReactNativeSqlCipher\node_modules

4)Check file: android/settings.gradle has proper path

include ':react-native-cipher-storage' 
project(':react-native-cipher-storage').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-cipher-storage/src/android')

5) Update app Gradle Build in file: android/app/build.gradle
dependencies { ... compile project(':react-native-sqlite-storage') }



6) Open Command prompt at project location and run Commands  
	npm install
	npm install -g react-native-cli
	


7) Run command :

react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

Keep an AVD running on your system and the run following command

react-native run-android

