import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDBDvMPGAL5CHMMvBgf_Wih9LQ2HIJAC4k",
    authDomain: "hangman-6525a.firebaseapp.com",
    databaseURL: "https://hangman-6525a.firebaseio.com",
    projectId: "hangman-6525a",
    storageBucket: "hangman-6525a.appspot.com",
    messagingSenderId: "36506336833"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        /* Helper */

        this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;

        /* Firebase APIs */

        this.auth = app.auth();
        this.db = app.database();

    }

    // *** Auth API ***

    doIsSignedIn = () => {
        return this.auth;
    };

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doGetInfo = () => {
        const userId = this.auth.currentUser.uid;
        return this.db.ref('/users/' + userId);
    };

    doWinsUpdate = wins => {
        const userId = this.auth.currentUser.uid;
        this.db.ref('/users/' + userId + '/wins').transaction(function(currentWins) {
            return (currentWins || 0) + 1;
        });
    };

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // *** Message API ***

    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');
}


export default Firebase;