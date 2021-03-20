import { AuthMode } from "src/app/auth/auth.enum";

export const environment = {
  production: true,
  authMode: AuthMode.Firebase,
  firebase: {
    apiKey: 'AIzaSyD8-ZU3rL1EC2rN51JZo_2TnRVQsvaBuZw',
    // authDomain: '<your-project-authdomain>',
    // databaseURL: '<your-database-URL>',
    projectId: 'lemon-mart-9c5f7',
    // storageBucket: '<your-storage-bucket>',
    // messagingSenderId: '<your-messaging-sender-id>',
    appId: '1:923334762345:web:9c36fde11894c620b4e7f8',
    // measurementId: '<your-measurement-id>'
  }
}
