import React from 'react';
import Data from '../components/Data';
import Contents from '../components/Contents'; // Adjust the path according to your project structure


function MockTest() {
  return (
    <div>
      <h1>Mock Test</h1>
      <Contents dataContainer={Data} />
    </div>
  );
}

export default MockTest;
