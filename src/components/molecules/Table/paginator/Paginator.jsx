import React from 'react';
import styles from './Paginator.module.scss';
const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) pages.push(1, '...');
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 1) pages.push('...', totalPages);
    }
    return pages;
  };

  const pages = generatePageNumbers();
  return (
    <div className={styles['paginator-container']}>
      <button
        className={`${styles['page-arrow']} ${
          currentPage === 1 ? styles['disabled'] : ''
        }`}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        style={{
          backgroundColor: currentPage === 1 ? '#9ca3af' : page_ButtonColor,
          borderColor: currentPage === 1 ? '#9ca3af' : page_ButtonColor,
        }}
      >
        <img alt="Left Arrow" src={leftArrow} />
      </button>

      <div className={styles.paginator}>
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <div
              key={index}
              className={`${styles['page-item']} ${
                page === currentPage ? styles['active'] : ''
              }`}
              style={
                page === currentPage
                  ? {
                      backgroundColor: page_ButtonColor,
                      borderColor: page_ButtonColor,
                      border: `1px solid ${page_ButtonColor}`,
                    }
                  : {
                      border: `1px solid ${page_ButtonColor}`,
                    }
              }
              onClick={() => handlePageClick(page)}
            >
              {page}
            </div>
          ) : (
            <div key={index} className={styles.ellipsis}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )
        )}
      </div>

      <button
        className={`${styles['page-arrow']} ${
          currentPage === totalPages ? styles['disabled'] : ''
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        style={{
          backgroundColor:
            currentPage === totalPages ? '#9ca3af' : page_ButtonColor,
          borderColor:
            currentPage === totalPages ? '#9ca3af' : page_ButtonColor,
        }}
      >
        <img className={styles.arrows} alt="Right Arrow" src={rightArrow} />
      </button>
    </div>
  );
};

export default Paginator;
