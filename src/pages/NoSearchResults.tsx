
type NoSearchResultsProps = {
  searchQuery: string;
};

export const NoSearchResults = ({ searchQuery }: NoSearchResultsProps) => {
  return (
    <div className="text-center py-16 px-4 bg-gray-800/50 rounded-lg">
      <div className="mb-6 text-7xl">🔍</div>

      <h3 className="text-2xl font-bold text-white mb-2">
        No Snippets Found
      </h3>

      <p className="text-gray-400 text-lg">
        Your search for "<span className="font-semibold text-white">{searchQuery}</span>" did not match any snippets.
      </p>
      
      <p className="text-gray-500 mt-2">
        try using different keywords.
      </p>
    </div>
  );
};