import React, { Fragment, useState, useEffect} from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';

function Profile(){
  const { loading, user } = useAuth0();
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const onFileChange = (event) => {
    // Update the state 
    setSelectedFile(event.target.files[0]);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div> 
          <h2>File Details:</h2> 
          <p>File Name: {selectedFile.name}</p> 
          <p>File Type: {selectedFile.type}</p> 
          <p> 
            Last Modified:{" "} 
            {selectedFile.lastModifiedDate.toDateString()} 
          </p>
        </div> 
      ); 
    } else { 
      return ( 
        <div> 
          <br /> 
          <h4>Choose before Pressing the Upload button</h4> 
        </div> 
      ); 
    } 
  };

  const onFileUpload = () => { 
     
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "myFile", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    console.log(this.state.selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 
    axios.post("api/uploadfile", formData); 
  }; 

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div>
        <input type="file" onChange={onFileChange}></input>
        <button>
          Upload
        </button>
      </div>
      {fileData()}
    </Fragment>
  );
};

export default Profile;