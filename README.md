PetShop : 
Creating a Pet Shop Assignment when an user can list there pets by filling an form data and images and he / she can order there favourite pet by there own comfort.

Git Hub Link :- https://github.com/Suhail-SJrD/PetShopFYN.git

Setup Instruction : 

Clone the repo
git clone https://github.com/<your-username>/PetShop.git
cd PetShop

Install dependencies
npm install

Start Metro (React Native bundler)
npm start

Run on Android
npm run android

Run on iOS
npm run ios

Third Party Api and Application Info : 


Name	            petShopFNY
Version	            0.0.1
Platform	        React Native (Android & iOS)
State Management	Zustand (for global cart state)
Form Validation	    Zod
Networking	        Axios / Fetch API
Image Handling	    react-native-image-picker, react-native-vision-camera
Navigation	        react-navigation
Extras	            Toast notifications, unique IDs with react-native-uuid, vector icons.


Libraries & Dependencies : 

@react-native-community/netinfo – Detect network connection
@react-navigation/native & native-stack – Handle screen navigation
axios – Make HTTP requests
react-native-image-picker & react-native-vision-camera – Take or pick photos for pets
react-native-toast-message – Show quick notifications
zustand – Manage global state (like cart)
zod – Validate forms easily
react-native-vector-icons – Add icons for UI

Project Architecture :
I am using a single-file component approach for each screen: ui, logic, and styling are together.

