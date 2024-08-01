import React from 'react';

// Update Tooltip to accept className as a prop
const Tooltip: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <div className={`absolute bottom-full mb-2 w-40 p-2   text-sm rounded-md opacity-0 transition-opacity duration-300 ${className} pointer-events-none`}>
    {text}
  </div>
);

const GitHubIcon = () => (
  <div className="relative group w-32 h-32">
    <svg
      className="w-full h-full text-gray-900 opacity-50 hover:opacity-100 transition duration-300 cursor-pointer invert"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ filter: 'invert(1)' }}
    >
      <path d="M12 .297C5.373.297 0 5.67 0 12.3c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.016-2.06-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.068 1.833 2.803 1.304 3.49.996.108-.774.418-1.304.76-1.604-2.665-.305-5.467-1.333-5.467-5.933 0-1.312.47-2.383 1.235-3.22-.124-.304-.536-1.526.117-3.18 0 0 1.008-.323 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.654.242 2.876.12 3.18.77.837 1.232 1.907 1.232 3.22 0 4.61-2.807 5.624-5.48 5.922.43.37.81 1.102.81 2.22 0 1.604-.014 2.894-.014 3.287 0 .32.216.698.824.58C20.565 22.092 24 17.596 24 12.3c0-6.63-5.373-12.003-12-12.003z" />
    </svg>
    <Tooltip text="Fetching 'Fixed Video Section' commit" className="group-hover:opacity-100" />
  </div>
);

const TwitterIcon = () => (
  <div className="relative group w-32 h-32">
    <svg
      className="w-full h-full text-gray-900 opacity-50 hover:opacity-100 transition duration-300 cursor-pointer invert"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.206-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.729-.666 1.574-.666 2.476 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.416-1.68 1.318-3.809 2.105-6.104 2.105-.39 0-.779-.023-1.17-.067 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14-7.497 14-13.986 0-.209 0-.42-.015-.63.961-.689 1.797-1.56 2.457-2.548l-.047-.02z" />
    </svg>
    <Tooltip text="Making the Twitter posts" className="group-hover:opacity-100" />
  </div>
);

const ArrowIcon = () => (
  <div className="relative group w-32 h-32">
    <svg
      className="w-full h-full text-gray-900 opacity-50 hover:opacity-100 transition duration-300 cursor-pointer invert"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13 2.5v5.4H3.7v7.2H13v5.4l8-8.1-8-8.1z" />
    </svg>
    <Tooltip text="Processing  'Fixed Video Section' commit through LLM" className="group-hover:opacity-100" />
  </div>
);

const Languages = () => {
  return (
    <div className=" h-46 mr-16 ml-16 pt-64">
    <div className="flex justify-center  space-x-4 ">
      <GitHubIcon />
      <ArrowIcon />
      <TwitterIcon />
    </div>
  </div>
  );
};

export default Languages;