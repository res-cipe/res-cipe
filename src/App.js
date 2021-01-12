import React from 'react';
import AddApplication from './components/AddApplication';
import AddResume from './components/AddResume';
import 'react-dropzone-uploader/dist/styles.css';

const App = () => {
  return (
    <div>
      <AddApplication />
      <AddResume />
    </div>
  );
};

export default App;
