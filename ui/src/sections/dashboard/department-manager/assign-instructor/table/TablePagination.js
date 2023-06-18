import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

TablePagination.propTypes = {
    courses: PropTypes.array,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.number
};

export default function TablePagination({ courses, setCurrentPage, currentPage }) {
    const totalPage = Math.ceil(courses.length / 10);

    if (totalPage < 2) return null;

    console.log(currentPage);
    return (
        <nav aria-label="Page navigation example d-flex align-items-center justify-content-end">
            <ul className="pagination">
                <li className="page-item mr-2">
                    <Button className="page-link" variant="link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                </li>
                {new Array(totalPage).fill(0).map((_, page) => (
                    <li className="page-item mr-2" key={page}>
                        <Button className="page-link" variant="link" onClick={() => setCurrentPage(page + 1)} disabled={currentPage === page + 1}>
                            {page + 1}
                        </Button>
                    </li>
                ))}
                <li className="page-item">
                    <Button className="page-link" variant="link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage}>
                        Next
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
