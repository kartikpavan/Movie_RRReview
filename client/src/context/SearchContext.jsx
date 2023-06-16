import { useState, useEffect, useContext, createContext } from "react";
import { debounce } from "lodash";
import { useNotificationContext } from "./NotificationContext";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const { updateNotification } = useNotificationContext();
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const debounceSearch = debounce(async (method, query, updatorFunc) => {
    const { error, data } = await method(query);
    if (error) return updateNotification("error", error);
    if (!data.length) return setResultNotFound(true);
    setResults(data);
    updatorFunc([...data]);
    console.log(data);
  }, 500);

  const handleSearch = (method, query, updatorFunc) => {
    if (!query.trim()) {
      updatorFunc([]);
      resetSearch();
    }
    debounceSearch(method, query, updatorFunc);
  };

  const resetSearch = () => {
    setIsSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, resetSearch, isSearching, results, resultNotFound }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
