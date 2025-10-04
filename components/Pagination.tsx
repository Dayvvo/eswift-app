import React from "react";
import { FaBackward, FaForward } from "react-icons/fa";
import { IoCaretBack, IoCaretForwardOutline } from "react-icons/io5";
import styled from "styled-components";

type Props = {
  totalPost: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
};

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .pagination-button {
    border: none;
    border-radius: 50%;
    min-width: 30px; /* Set a minimum width */
    height: 30px;
    margin: 0 5px;
    padding: 0 10px; /* Add padding for better readability */
    font-size: 14px; /* Adjust font size */
    display: flex; /* Allow flex items to wrap */
    align-items: center; /* Center text vertically */
    justify-content: center; /* Center text horizontally */
    white-space: nowrap; /* Prevent wrapping */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Display ellipsis for long numbers */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pagination-button:hover {
    background-color: #ddd;
  }

  .pagination-button.active {
    background-color: #007bff;
    color: #fff;
  }
`;

const Pagination = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: Props) => {

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => {
      return (prevPage < totalPages ? prevPage + 1 : prevPage)
    });
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <StyledPagination>
      <button onClick={goToFirstPage} className="pagination-button">
        <FaBackward />
      </button>
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <IoCaretBack />
      </button>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        <IoCaretForwardOutline />
      </button>
      <button onClick={goToLastPage} className="pagination-button">
        <FaForward />
      </button>
    </StyledPagination>
  );
};

export default Pagination;