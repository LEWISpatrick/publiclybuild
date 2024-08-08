import React, { useState } from 'react';
import { Button } from '../ui/button';

interface Props {
  commits: any[];
  selectedCommit: any;
  setSelectedCommit: (commit: any) => void;
  loading: boolean;
}

const CommitSelector: React.FC<Props> = ({ commits, selectedCommit, setSelectedCommit, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commitsPerPage = 5;

  // Filter commits based on search term
  const filteredCommits = commits.filter((commit) =>
    commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate commits
  const indexOfLastCommit = currentPage * commitsPerPage;
  const indexOfFirstCommit = indexOfLastCommit - commitsPerPage;
  const currentCommits = filteredCommits.slice(indexOfFirstCommit, indexOfLastCommit);

  // Pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCommits.length / commitsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mt-4">Choose GitHub Commit</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search commits..."
          className="p-2 border rounded-lg w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : (
        <div>
          <ul className="list-disc pl-5">
            {currentCommits.length > 0 ? (
              currentCommits.map((commit, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCommit(commit)}
                  className={`cursor-pointer p-2 mb-2 border rounded-lg hover:bg-gray-100 ${
                    selectedCommit === commit ? 'bg-gray-200 font-bold' : ''
                  }`}
                >
                  <p>Message: {commit.commit.message}</p>
                  <p>Date: {new Date(commit.commit.author.date).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No commits available</p>
            )}
          </ul>

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="px-4 py-2  rounded-lg"
            >
              Previous
            </Button>
            <div>
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`mx-1 px-3 py-1 border rounded-lg ${
                    number === currentPage ? '' : ''
                  }`}
                >
                  {number}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => setCurrentPage(Math.min(pageNumbers.length, currentPage + 1))}
              className="px-4 py-2  rounded-lg"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommitSelector;
