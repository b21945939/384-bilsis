import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

QuestionListPagination.propTypes = {
    list: PropTypes.array,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.number
};

export default function QuestionListPagination({ list, setCurrentPage, currentPage }) {
    return (
        <nav aria-label="Page navigation example d-flex align-items-center justify-content-end">
            <ul className="pagination">
                <li className="page-item">
                    <Button className="page-link" variant="link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                        Previous
                    </Button>
                </li>
                {new Array(list.length > 8 ? 8 : list.length).fill(0).map((_, page) => (
                    <li className="page-item" key={page} onClick={() => setCurrentPage(page)}>
                        <Button className="page-link" variant="link" disabled={currentPage === page}>
                            {page + 1}
                        </Button>
                    </li>
                ))}
                <li className="page-item">
                    <Button
                        className="page-link"
                        variant="link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === list.length - 1}
                    >
                        Next
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
