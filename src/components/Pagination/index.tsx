import React, { useEffect, useState } from "react";
import "./style.scss";

interface IProps {
    totalResults: number;
    currentPage: number;
    pageSize: number;
    paginate: any;
}


const Pagination: React.FunctionComponent<IProps> = ({ totalResults, currentPage, paginate, pageSize }) => {
    const [pageNumbers, setPageNumbers] = useState<[]>([]);
    const page:any = [];
  // Set Page Numbers
  useEffect(() => {
    const totalPageCount: number = Math.ceil(totalResults / pageSize);

    for (let index = 1; index <= totalPageCount; index++) {
      page.push(index);
    }

    setPageNumbers(page);
  }, [totalResults, currentPage, pageSize]);

  return (
    <ul className="pagination">
      {currentPage > 1 && totalResults > 5 && (
        <li className="pagination__pager">
          <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        </li>
      )}
      {pageNumbers.map((page, index) => {
        return (
          <li
            key={index}
            className={
              currentPage === page
                ? "pagination__pager pagination__pager--number pagination__pager--active"
                : "pagination__pager pagination__pager--number"
            }>
            <button onClick={() => paginate(page)}>{page}</button>
          </li>
        );
      })}
      {currentPage < pageNumbers.length && (
        <li className="pagination__pager">
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
