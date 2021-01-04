import React, { useEffect } from 'react';
import axios from 'axios';

export default function App() {
  useEffect(() => {
    axios.get('http://localhost:4001/').then(console.log);
  }, []);
  return <div>App</div>;
}
