import { firebaseApp } from '@/firebase/firebaseinit';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, getFirestore, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';

// FIREBASE AUTH INIT
const auth = getAuth(firebaseApp);
const db = getFirestore();
const dbCollection = collection(db, 'users');

// FIRESTORE INIT & UTILS
// const dbDocument = doc(db, 'users', 'USER_ID'); // third aruguement is the value of the document id ;

//! COLLECTION QUERY
// where takes in three arguments ('document value', 'multiplier, eg, =, >, <', 'value')
// const q = query(dbCollection, where('firstName', '==', 'a'));
// orderBy function takes in the fieldvalue as param
// const q = query(dbCollection, orderBy('email'));

//! GET COLLECTION FROM FIRESTORE DATABASE - REAL TIME COLLECTION DATA
// const users: any = [];
// onSnapshot(dbCollection, (snapshot) => {
//   // eslint-disable-next-line no-shadow
//   snapshot.docs.forEach((doc) => {
//     users.push({ ...doc.data(), id: doc.id });
//   });
// });

// const filteredUsers: any = [];
// onSnapshot(q, (snapshot) => {
//   // eslint-disable-next-line no-shadow
//   snapshot.docs.forEach((doc) => {
//     filteredUsers.push({ ...doc.data(), id: doc.id });
//   });
// });

//! GET A SINGLE DOCUMENT
// const dbDocumentSingle = doc(db, 'users', 'AgQnLD4Tc38Snk8g3Pc6'); // third argument is the document id
// onSnapshot(dbDocumentSingle, (singleDoc) => {
//   console.log(singleDoc.data(), singleDoc.id);
// });

//! UPDATE SINGLE DOCUMENT
// const updateDocument = doc(db, 'users', 'CfO0EYQZERhKokaAeO3Q'); // third argument is the document id

// updateDoc(updateDocument, {
//   email: 'aa1@a.com',
//   lastName: 'a1',
//   username: 'aa1',
// }).then(() => {
//   // form.reset()
// });

//! ADD TO FIRESTORE DATABASE DOCUMENT
// addDoc(dbCollection, {
//   // serverTimestamp creates a unique timestamp for the collection data
//   createdAt: serverTimestamp();
// }).then(() => {
//   // form.reset();
// });

//! DELETE FROM FIRESTORE DATABASE DOCUMENT
// deleteDoc(dbDocument).then(() => {
//   // form.reset;
// });

// eslint-disable-next-line prefer-destructuring
// const user: any = auth.currentUser;

//! SIGN OUT USER
// signOut(auth)
//   .then(() => {
//     console.log('user signed out');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//! STORE INIT
export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    profileId: '',
    profileUID: '',
    profileUDisplayName: '',
    profileUPhotoURL: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileEmail: null,
  }),
  actions: {
    async signup(email: string, password: string) {
      await createUserWithEmailAndPassword(auth, email, password);
    },

    async login(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password);
    },

    async logout() {
      await signOut(auth);
    },

    async createUserData(firstName: string, lastName: string, userName: string, email: string, password: string) {
      await addDoc(collection(db, 'users'), {
        firstName,
        lastName,
        userName,
        email,
        password,
        created: serverTimestamp(),
      });
    },

    async getCurrentUser() {
      const user = auth.currentUser;
      if (user !== null) {
        const { uid, email } = user;
        const q = query(dbCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((document) => {
          this.profileId = document.id;
          this.profileUID = uid;
          this.profileFirstName = document.data().firstName;
          this.profileLastName = document.data().lastName;
          this.profileUserName = document.data().userName;
          this.profileEmail = document.data().email;
          const displayName = `${document.data().firstName} ${document.data().lastName}`;
          this.profileUDisplayName = displayName;
          this.profileUPhotoURL = document.data().photoURL;
        });
      }
    },

    async updateUser(firstName: string, lastName: string, userName: string, photoURL: string) {
      const user = auth.currentUser;
      if (user !== null) {
        const { email } = user;
        const q = await query(dbCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          const docId: any = document.id;
          const docRef = doc(db, 'users', docId);
          updateDoc(docRef, {
            firstName,
            lastName,
            userName,
            photoURL,
          });
        });
      }
    },

    async passwordResetEmail(email: string) {
      await sendPasswordResetEmail(auth, email);
    },

    // setProfileInfo(this, res: any) {
    //   this.profileId = res.id;
    //   this.profileEmail = res.data().email;
    //   this.profileFirstName = res.data().firstName;
    //   this.profileLastName = res.data().lastName;
    //   this.profileUserName = res.data().username;
    // },
    // setProfileInitials() {
    //   this.profileInitials = this.profileFirstName.match(/(\b\s)?/g).join('') + this.profileLastName.match(/(\b\S)?/g).join('');
    // },
    // updateUser(this, payload: any) {
    //   this.user = payload;
    // },
  },
});
