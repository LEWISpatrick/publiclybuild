import React from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  description: string;
  setDescription: (desc: string) => void;
}

const ProjectDescription: React.FC<Props> = ({ description, setDescription }) => {
  const handleDescribe = () => {
    toast.success('🔥 Describe Your Project Well!?');
  };

  return (
    <div>
      <h2 className="text-lg font-bold mt-4">Describe Your Project/Commit</h2>
      <textarea
        className="p-4 border rounded-lg resize-none h-32"
        placeholder="Project is about how to drink water"
        value={description}
        onClick={handleDescribe}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
    </div>
  );
};

export default ProjectDescription;
