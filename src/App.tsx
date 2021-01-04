import React, { useEffect } from 'react';
import axios from 'axios';

export default function App() {
  useEffect(() => {
    axios
      .get('http://localhost:4001/spendings?month=2021-01', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ0aXZpdGFsQGdtYWlsLmNvbSIsImlkIjoiNWZmMmZjOWZlMmYwZTYzZTU3NDFkZTdhIiwiaWF0IjoxNjA5NzY3MTg4fQ.KwouiAhFl3RGD_LMAvoof9KlXbihGCU_uYwW1RbKDSw',
        },
      })
      .then(console.log);
  }, []);
  return <div>App</div>;
}
