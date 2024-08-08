import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  tweetTemplates: string[];
  selectedTemplate: number | null;
  setSelectedTemplate: (index: number) => void;
}

const TweetTemplateSelector: React.FC<Props> = ({ tweetTemplates, selectedTemplate, setSelectedTemplate }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-4">Select a Tweet Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {tweetTemplates.map((template, index) => (
          <Card
            key={index}
            className={`p-4 border rounded-lg h-40 ${
              selectedTemplate === index ? 'border-blue-500' : ''
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <p>{template}</p>
              <Button onClick={() => setSelectedTemplate(index)} disabled={selectedTemplate === index}>
                {selectedTemplate === index ? 'Selected' : 'Choose Template'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TweetTemplateSelector;
