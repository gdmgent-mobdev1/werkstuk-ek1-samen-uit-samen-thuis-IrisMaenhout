const config = {
  apiKey: "AIzaSyDGGOM37sYJnwZtOEOrx0gvO5znt78CKic",
  authDomain: "samen-uit-samen-thuis-d6c8e.firebaseapp.com",
  projectId: "samen-uit-samen-thuis-d6c8e",
  storageBucket: "samen-uit-samen-thuis-d6c8e.appspot.com",
  messagingSenderId: "602174153915",
  appId: "1:602174153915:web:2107476e440ade66b7f59e"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}