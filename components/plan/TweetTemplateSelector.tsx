import React, { useState } from 'react';

type TweetTemplateSelectorProps = {
  tweetTemplates: {
    [key: string]: string[];
  };
  onTemplateSelect: (index: number) => void; // Add this prop to handle template selection
};

const TweetTemplateSelector: React.FC<TweetTemplateSelectorProps> = ({ tweetTemplates, onTemplateSelect }) => {
  const [selectedType, setSelectedType] = useState<string>(Object.keys(tweetTemplates)[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTemplates = tweetTemplates[selectedType].filter((template) =>
    template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
              <h2 className="text-lg font-bold mt-4">Choose Template</h2>
 <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search templates..."
        className="p-2 border max-w-xs rounded-lg w-full mr-5"

      />
                    <h2 className="text-lg font-bold mt-4">Choose Template Type</h2>

      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        {Object.keys(tweetTemplates).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

     

      <div>
        {filteredTemplates.map((template, index) => (
          <div
            key={index}
            onClick={() => onTemplateSelect(index)} // Call the onTemplateSelect function when a template is clicked
            className="cursor-pointer p-2 hover:bg-gray-900"
          >
            {template}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetTemplateSelector;
