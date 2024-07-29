// Client-side component remains the same
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Repository {
  id: number;
  full_name: string;
  name: string;
}

const Page = () => {
  const [repoName, setRepoName] = useState<string>('');
  const [repository, setRepository] = useState<Repository | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRepository = async () => {
    if (repoName.trim() === '') {
      setError('Repository name cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/repos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoName }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repository');
      }

      const data: Repository | { error: string } = await response.json();

      if ('error' in data) {
        setError(data.error);
        setRepository(null);
      } else {
        setRepository(data);
        setError(null);
      }
    } catch (error) {
      setError('Error fetching repository');
      console.error('Error fetching repository:', error);
    }
  };

  return (
    <div className='flex flex-col space-y-4 p-4'>
      <input
        type='text'
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder='Enter repository name'
        className="p-4 border border-gray-300 rounded-lg"
      />
      <p className="text-gray-500">Repository must be public</p>
      <Button
        onClick={handleFetchRepository}
        className="p-4 mt-10 rounded-xl text-white bg-green-500 hover:bg-green-600"
      >
        Fetch Repository
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {repository && (
        <div>
          <h3>Repository Details</h3>
          <p><strong>Full Name:</strong> {repository.full_name}</p>
          <p><strong>Name:</strong> {repository.name}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
