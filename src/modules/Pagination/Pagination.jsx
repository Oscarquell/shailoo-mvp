import React, { useEffect, useState } from "react";
import style from "./Pagination.module.css";

const Pagination = ({ page = 1, setPage, totalPages = 1 }) => {
    const [pages, setPages] = useState([]);

    const generatePages = () => {
        const maxButtons = 5;
        const newPages = [];
        let startPage, endPage;

        if (totalPages <= maxButtons) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxButtons / 2);
            const maxPagesAfterCurrent = Math.ceil(maxButtons / 2) - 1;
            startPage = Math.max(1, page - maxPagesBeforeCurrent);
            endPage = Math.min(totalPages, page + maxPagesAfterCurrent);

            if (endPage - startPage + 1 < maxButtons) {
                if (startPage === 1) {
                    endPage = Math.min(totalPages, startPage + maxButtons - 1);
                } else if (endPage === totalPages) {
                    startPage = Math.max(1, endPage - maxButtons + 1);
                }
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            newPages.push(i);
        }

        setPages(newPages);
    };

    useEffect(() => {
        generatePages();
    }, [totalPages, page]);

    const handlePrev = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        if (page < totalPages) setPage(page + 1);
    };

    const handlePageClick = (pageNumber) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        setPage(pageNumber);
    };

    return (
        <div className={style.parent}>
            <button
                className={style.paginationButton}
                disabled={page === 1}
                onClick={() => {setPage(1);}}
            >
                «
            </button>
            <button
                className={style.paginationButton}
                onClick={handlePrev}
                disabled={page === 1}
            >
                {"<"}
            </button>

            {pages.map((item) => (
                <button
                    key={item}
                    className={`${style.paginationItem} ${page === item ? style.active : ""}`}
                    onClick={() => handlePageClick(item)}
                >
                    {item}
                </button>
            ))}

            {totalPages > pages[pages.length - 1] && (
                <span className={style.ellipsis}>...</span>
            )}

            {totalPages > pages[pages.length - 1] && (
                <button
                    className={style.paginationItem}
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </button>
            )}

            <button
                className={style.paginationButton}
                onClick={handleNext}
                disabled={page === totalPages}
            >
                >
            </button>
            <button
                className={style.paginationButton}
                onClick={() => {setPage(totalPages);}}
                disabled={page === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;