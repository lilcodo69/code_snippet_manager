
type NoSearchResultsProps = {
  searchQuery: string;
};

export const NoSearchResults = ({ searchQuery }: NoSearchResultsProps) => {
  return (
    <div className="text-center py-16 px-4 bg-zinc-800/50 rounded-lg">
      <div className="mb-6 text-7xl flex justify-center items-center"><img src="/img/lense.png" className="h-14 w-14 object-contain " /></div>

      <h3 className="text-2xl font-bold text-zinc-400 mb-7 text-center">
        No Snippets Found
      </h3>

      <p className="text-gray-400 text-md">
        Your search for "<span className="font-semibold text-zinc-300">{searchQuery}</span>" did not match any snippets.
      </p>
      
      <p className="text-zinc-400 ">
        try using different keywords.
      </p>
    </div>
  );
};