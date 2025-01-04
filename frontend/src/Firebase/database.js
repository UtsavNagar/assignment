import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from './firebase';  // Make sure to import your Firestore instance
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const addUserDataToDatabase = async (userData) => {
  try {
    const userCollectionRef = collection(db, "Users");
    const docRef = await addDoc(userCollectionRef, userData);
    console.log("Document successfully written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error writing document:", error);
    throw error;
  }
};

export const signinUserWithEmailAndPassword=(email,password)=>{
  try{
    return signInWithEmailAndPassword(auth,email,password)
  }catch(e){
    console.log(e)
  }
}

export const logout = () => {
  let status = true
    signOut(auth).then(() => {
        console.log("User signed out successfully.");
        status = true
    }).catch((error) => {
        console.error("Error signing out: ", error);
        status = false
    });
    return status
};

// Function to add job ID to the user's postedJobs array
export const addJobToUserProfile = async (userId, jobId) => {
  try {
      const usersCollectionRef = collection(db, 'Users');

      // Query for documents where the userId field matches the passed userId
      const userQuery = query(usersCollectionRef, where('uid', '==', userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
          // Document exists – update the first matching document
          const userDoc = querySnapshot.docs[0];
          const userRef = userDoc.ref;

          await updateDoc(userRef, {
              postedJobs: arrayUnion(jobId)
          });

          console.log('Job ID added to user profile:', jobId);
      } else {
          // No document found – create a new one
          const newUserRef = doc(usersCollectionRef);  // Create a new document
          await setDoc(newUserRef, {
              userId: userId,  // Store the userId in the new document
              postedJobs: [jobId]  // Initialize with the jobId
          });

          console.log('New user document created, and job ID added:', jobId);
      }
  } catch (error) {
      console.error('Error updating/creating user profile:', error);
      throw error;
  }
};


export const addJobDataToDatabase = async (jobData) => {
  try {
    // Reference to the 'jobs' collection
    const jobsCollectionRef = collection(db, "jobs");

    // Add the job data to Firestore
    const docRef = await addDoc(jobsCollectionRef, jobData);

    const userId = auth.currentUser?.uid;

    console.log("Job successfully posted with ID: ", docRef.id);
    console.log("user id: ", userId);
    
    await addJobToUserProfile(userId,docRef.id)

    return docRef.id;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

export const fetchJobsFromDatabase = async () => {
  try {
    const jobsCollectionRef = collection(db, 'jobs'); // Reference to the jobs collection
    const jobsSnapshot = await getDocs(jobsCollectionRef); // Get all documents in the collection
    const jobsList = jobsSnapshot.docs.map(doc => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));

    console.log("Fetched Jobs: ", jobsList);
    return jobsList;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Apply to Job - Update User and Job
export const applyToJob = async (userId, jobId) => {
  try {
    console.log(userId, jobId);

    // 1. Query for user document where uid == userId
    const usersCollection = collection(db, 'Users');
    const q = query(usersCollection, where('uid', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If user document exists, update it
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        appliedInJobs: arrayUnion(jobId)
      });
    } else {
      // If no matching user, create a new document
      const newUserRef = doc(usersCollection);  // Auto-generate ID
      await setDoc(newUserRef, {
        uid: userId,
        appliedInJobs: [jobId]
      });
    }

    // 2. Add applicant to the job's Applicants array
    const jobRef = doc(db, 'jobs', jobId);
    const jobDoc = await getDoc(jobRef);

    if (jobDoc.exists()) {
      await updateDoc(jobRef, {
        Applicants: arrayUnion(userId)
      });
    } else {
      // If job document doesn't exist, initialize Applicants array
      await setDoc(jobRef, {
        Applicants: [userId]
      }, { merge: true });
    }

    console.log('Application successful:', jobId);
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error;
  }
};
