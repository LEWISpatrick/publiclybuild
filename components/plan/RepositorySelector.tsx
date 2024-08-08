import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RepositorySelectorProps {
  repos: any[];
  currentRepoIndex: number;
  setCurrentRepoIndex: React.Dispatch<React.SetStateAction<number>>;
  fetchCommits: (repoFullName: string) => void;
  loading: boolean;
}

const RepositorySelector: React.FC<RepositorySelectorProps> = ({
  repos,
  currentRepoIndex,
  setCurrentRepoIndex,
  fetchCommits,
  loading,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter repositories based on search query
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayRepos = filteredRepos.slice(currentRepoIndex, currentRepoIndex + 3);

  const handleNext = () => {
    if (currentRepoIndex + 3 < filteredRepos.length) {
      setCurrentRepoIndex(currentRepoIndex + 3);
    }
  };

  const handlePrevious = () => {
    if (currentRepoIndex - 3 >= 0) {
      setCurrentRepoIndex(currentRepoIndex - 3);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mt-4">Choose GitHub Repository</h2>
      <input
        type="text"
        placeholder="Search repositories..."
        className="p-2 border max-w-xs rounded-lg w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <p className="italic">Loading...</p>
      ) : (
        <div className="relative p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {displayRepos.map((repo, index) => (
              <Card key={index} className="p-4 border rounded-lg h-40">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-lg font-bold">{repo.name}</p>
                    <p className="text-sm">Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
                  </div>
                  <Button onClick={() => fetchCommits(repo.full_name)}>Select</Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
            <Button onClick={handlePrevious} disabled={currentRepoIndex === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={currentRepoIndex + 3 >= filteredRepos.length}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositorySelector;
