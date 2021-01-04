import React from 'react';
import AuthForm from './components/AuthForm/AuthForm';
// import axios from 'axios';

// useEffect(() => {
//   axios
//     .get('http://localhost:4001/spendings?month=2021-01', {
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ0aXZpdGFsQGdtYWlsLmNvbSIsImlkIjoiNWZmMmZjOWZlMmYwZTYzZTU3NDFkZTdhIiwiaWF0IjoxNjA5NzY3MTg4fQ.KwouiAhFl3RGD_LMAvoof9KlXbihGCU_uYwW1RbKDSw',
//       },
//     })
//     .then(console.log);
// }, []);

export default function App() {
  return (
    <div>
      <AuthForm />
    </div>
  );
}
