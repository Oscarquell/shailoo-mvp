import React, { useEffect, useState } from "react";
import style from "./Pagination.module.css";

const Pagination = ({ page = 0, setPage, totalPages = 1 }) => {
    const [pages, setPages] = useState([]);

    const generatePages = () => {
        const maxButtons = 5;
        const newPages = [];
        let startPage, endPage;

        if (totalPages <= maxButtons) {
            startPage = 0;
            endPage = totalPages - 1;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxButtons / 2);
            const maxPagesAfterCurrent = Math.ceil(maxButtons / 2) - 1;
            startPage = Math.max(0, page - maxPagesBeforeCurrent);
            endPage = Math.min(totalPages - 1, page + maxPagesAfterCurrent);

            if (endPage - startPage + 1 < maxButtons) {
                if (startPage === 0) {
                    endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);
                } else if (endPage === totalPages - 1) {
                    startPage = Math.max(0, endPage - maxButtons + 1);
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const handlePrev = () => {
        if (page > 0) {
            scrollToTop();
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages - 1) {
            scrollToTop();
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        scrollToTop();
        setPage(pageNumber);
    };

    return (
        <div className={style.parent}>
            <button
                className={style.paginationButton}
                disabled={page === 0}
                onClick={() => {
                    scrollToTop();
                    setPage(0);
                }}
            >
                «
            </button>

            <button
                className={style.paginationButton}
                onClick={handlePrev}
                disabled={page === 0}
            >
                {"<"}
            </button>

            {pages.map((item) => (
                <button
                    key={item}
                    className={`${style.paginationItem} ${
                        page === item ? style.active : ""
                    }`}
                    onClick={() => handlePageClick(item)}
                >
                    {item + 1 /* отображаем 1-based номер для пользователя */}
                </button>
            ))}

            {totalPages - 1 > pages[pages.length - 1] && (
                <>
                    <span className={style.ellipsis}>...</span>
                    <button
                        className={style.paginationItem}
                        onClick={() => handlePageClick(totalPages - 1)}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={style.paginationButton}
                onClick={handleNext}
                disabled={page === totalPages - 1}
            >
                {">"}
            </button>

            <button
                className={style.paginationButton}
                onClick={() => {
                    scrollToTop();
                    setPage(totalPages - 1);
                }}
                disabled={page === totalPages - 1}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;
