import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { getDefaultNormalizer } from "@testing-library/react";

// import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDcgMUaROHOkNE6zxPScDUp2F7v6b8rVd8",
  authDomain: "notebook-dz.firebaseapp.com",
  projectId: "notebook-dz",
  storageBucket: "notebook-dz.appspot.com",
  messagingSenderId: "377087164383",
  appId: "1:377087164383:web:77f0c9bb0ea3ab03264e6a",
  measurementId: "G-68P5JNBQMZ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>{user ? <MainPart /> : <SignIn />}</section>
     
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    
    
    
  };
  return (
    <>
      <center>
        <button className="sign-in" onClick={signInWithGoogle}>
          {" "}
          <i className="fab fa-google"></i> Sign in with Google
        </button>
      </center>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out btn btn-sm" onClick={() => auth.signOut()}>
        <i className="fas fa-sign-out-alt"></i> Sign Out
      </button>
    )
  );
}

function MainPart() {
  // const [notes] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState("");
  const [des, setDes] = useState("");
  const { uid, photoURL, displayName, email } = auth.currentUser;
  const [notes, setNotes] = useState([]);
  const [user] = useAuthState(auth);


  
 

  const handleSubmit = () => {
    firestore.collection("notes").add({
      title: formValue,
      content: des,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
      email,
      
      
    });

    setFormValue("");
    setDes("");
    

  };

  
  useEffect(() => {
    if(user.email == 'farhanibne860@gmail.com' ||  user.email == 'farhanibne760@gmail.com' || 
    user.email == 'saifulalam.nbr@gmail.com')
    firestore.collection("notes").onSnapshot((snapshot) => {
      setNotes(snapshot.docs.map((doc) => doc.data()));
    });
    else{
     console.log("not allowed")
    
    }
 
  }, []);


  
  

  if(user.email === 'farhanibne860@gmail.com' ||  user.email === 'farhanibne760@gmail.com' || 
  user.email === 'saifulalam.nbr@gmail.com'){


    
  return (
    <>
      {/* input fields start */}
      <form>
        <div className="mb-3 mx-3 my-6">
          <label
            style={{ color: "azure", fontSize: "25px" }}
            htmlFor="exampleInputEmail1"
            className="form-label"
          >
            Title
          </label>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            style={{
              background: "#282c34",
              border: "3px dashed black",
              color: "azure",
            }}
            placeholder="place a title here"
            type="text"
            className="form-control "
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3 mx-3 my-6">
          <label
            style={{ color: "azure", fontSize: "25px" }}
            htmlFor="exampleInputPassword1"
            className="form-label"
          >
            Description
          </label>
          <sup style={{ color: "grey" }}>
            {" "}
            <i className="far fa-question-circle"></i> Optional
          </sup>

          <textarea
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="form-control"
            placeholder="Leave a description here"
            id="floatingTextarea"
            style={{
              background: "#282c34",
              border: "3px dashed black",
              color: "azure",
            }}
          ></textarea>
        </div>

        <button
          disabled={!formValue}
          style={{
            border: "6px solid rgb(0, 17, 92)",
            borderRadius: "12px 12px 10px 10px",
            color: "azure",
            fontSize: "20px",
          }}
          onClick={handleSubmit}
          type="submit"
          className="bg-primary mx-3 my-3 btn btn-sm"
        >
          Add Note
        </button>
        <br />
      </form>

      {/* input field ends */}
      <h1 style={{ marginLeft: "20px" }}>Your Notes</h1> 

      <div className="row my-3" style={{ scrollbarColor:'black',marginRight:'20px'}}>
       


        {notes.map((note) => (
          <div className="col-md-3 "  style={{marginLeft:'15px',marginRight:'20px'}}>
            <div
              className="card my-3 "
              style={{
                background: "#282c34",
                border: "3px double black",
                color: 'azure'
             
              }}
            >
              <div className="card-body">
                <h3 className="card-title">{note.title}</h3>
                <p className="card-text">{note.content}</p>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );



  }
  else{
    return(
      <>
      <center>
        <h1>Sorry.. You've no entry in this site. thank you... you can contact us at <sub>farhanibnesaif@gmail.com</sub></h1>

      </center>

      </>
    );
  }

}

export default App;
