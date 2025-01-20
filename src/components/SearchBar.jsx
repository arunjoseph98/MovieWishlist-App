import React, { useState } from "react";
import { Button, Form, FormControl, ListGroup } from "react-bootstrap";
import { ImSearch } from "react-icons/im";
import loadingGif from "../assets/loading.gif";
import { searchAPI } from "../services/allAPI";
import Add from "./Add";

const SearchBar = ({setResHome}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setLoading(true);
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = async (key) => {
    try {
      const searchResult = await searchAPI(key);
      const searchArr = searchResult?.data?.Search || [];
      setSuggestions(searchArr);
    } catch (error) {
      setErrorMessage("Failed to fetch suggestions. Please try again.");
      console.error("Search API Error:", error);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <>
      <div className="container mt-4">
        <Form
          className="d-flex justify-content-center rounded-pill border border-warning"
          style={{ color: "black" }}
        >
          <FormControl
            type="search"
            placeholder="Search Movie..."
            className="rounded-pill"
            aria-label="Search"
            value={query}
            onChange={handleSearchChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => query && setShowSuggestions(true)}
          />
        </Form>
      </div>
      <div className="container d-flex justify-content-center">
  {showSuggestions &&
    (loading ? (
      <div className="d-flex justify-content-center align-items-center my-5 text-lg">
        <img width="80px" src={loadingGif} alt="Loading" />
        <span className="ms-3">Loading...</span>
      </div>
    ) : (
      <ListGroup
        className="position-absolute shadow"
        style={{
          marginTop: "10px",
          width: "100%", // Adjusts width to fit container
          maxWidth: "600px", // Limits max width for large screens
          maxHeight: "400px",
          overflowY: "auto",
          zIndex: 1050,
        }}
      >
        {errorMessage ? (
          <ListGroup.Item className="text-danger">{errorMessage}</ListGroup.Item>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <ListGroup.Item
              key={suggestion.imdbID}
              className="d-flex align-items-center"
            >
              <img
                style={{ width: "60px" }}
                src={suggestion?.Poster || loadingGif}
                alt={suggestion?.Title || "Movie"}
              />
              <div className="ms-4 d-flex justify-content-between w-100">
                <div>
                  <h6 style={{ marginBottom: "5px" }}>{suggestion?.Title}</h6>
                  <p
                    className="text-secondary"
                    style={{ marginBottom: "0px", fontSize: "0.85rem" }}
                  >
                    Year: {suggestion?.Year}
                  </p>
                </div>
                <Add data={suggestion} setResHome={setResHome} />
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No suggestions found</ListGroup.Item>
        )}
      </ListGroup>
    ))}
</div>

    </>
  );
};

export default SearchBar;
