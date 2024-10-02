// app/page.tsx

"use client"; // Make this a Client Component

import { useState } from 'react';
import Image from 'next/image'; // Import the Image component

// Define a type for the expected member details
interface Member {
  name: string;
  prn: string;
  class: string;
  year: string;
  div: string;
}

export default function Home() {
  const [id, setId] = useState('');
  const [result, setResult] = useState<Member | null>(null); // Use the Member type
  const [error, setError] = useState<string | null>(null); // Allow error to be string or null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setResult(data); // Set result as expected Member type
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error fetching data. Please try again.'); // Handle error
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      {/* Logo at the top */}
      {/* <div className="mb-6">
        <Image
          src="/app/assets/logo.png" // Adjust the path to the logo
          alt="AIMLSA Logo"
          width={350}
          height={350}
          className="object-contain"
        />
      </div> */}
      
      <h1 className="text-3xl font-bold mb-6">AIMLSA Member Verification</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="member-id" className="block text-lg font-medium mb-2">
          Enter Member ID:
        </label>
        <input
          type="text"
          id="member-id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-lg mb-4 w-full text-black" 
          placeholder="Unique ID"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          निर्णी (Verify)
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="border p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Member Details</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>PRN:</strong> {result.prn}</p>
          <p><strong>Class:</strong> {result.class}</p>
          <p><strong>Year:</strong> {result.year}</p>
          <p><strong>Division:</strong> {result.div}</p>
        </div>
      )}
    </main>
  );
}
