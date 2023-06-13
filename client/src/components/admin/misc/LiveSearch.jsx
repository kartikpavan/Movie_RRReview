import { useState } from "react";

const fakeData = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const LiveSearch = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleFocus = () => {
    if (fakeData.length) setShowSearchResults(true);
  };
  const handleBlur = () => {
    setShowSearchResults(false);
  };

  return (
    <div className="relative">
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        placeholder="Search Profile"
        className="input input-bordered input-primary w-full max-w-md"
      />
      <SearchResults visible={showSearchResults} results={fakeData} />
    </div>
  );
};

const SearchResults = ({ visible, results }) => {
  if (!visible) return null;
  return (
    <div className="absolute max-w-md right-0 left-0 top-14 bg-base-200 shadow-md rounded-md p-2 max-h-48 overflow-auto">
      {results.map((actor, idx) => {
        return (
          <div
            onClick={() => handleSelection(actor)}
            key={actor.id}
            className="cursor-pointer rounded overflow-hidden hover:bg-base-100 transition p-2 flex items-center space-x-3"
          >
            <img src={actor.avatar} alt={actor.name} className="w-12 h-12 rounded-full" />
            <p className="font-semibold">{actor.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LiveSearch;
