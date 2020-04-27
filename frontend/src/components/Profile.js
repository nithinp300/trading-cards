import React, { Fragment, useState, useEffect} from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Tab } from "react-bootstrap";

function Profile(){
  const { loading, user } = useAuth0();
  const [count, setCount] = useState(0);
  const [file, setFile] = useState('not uploaded');

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  if (loading || !user) {
    return <div>Loading...</div>;
  }

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
      <form onSubmit={() => setFile('uploaded')}>
        <label for="myfile">Select a file:</label>
        <input type="file" id="myfile" name="myfile"></input>
        <input type="submit" value="submit"></input>
      </form>
      <p>File was {file}</p>
    </Fragment>
  );
};

function fileData(){
     
  if (this.state.selectedFile) { 
      
    return ( 
      <div> 
        <h2>File Details:</h2> 
        <p>File Name: {this.state.selectedFile.name}</p> 
        <p>File Type: {this.state.selectedFile.type}</p> 
        <p> 
          Last Modified:{" "} 
          {this.state.selectedFile.lastModifiedDate.toDateString()} 
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

export default Profile;