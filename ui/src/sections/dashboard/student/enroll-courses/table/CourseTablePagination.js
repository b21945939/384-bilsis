import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

CourseTablePagination.propTypes = {
    courses: PropTypes.array.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default function CourseTablePagination({ courses, setCurrentPage, currentPage }) {
    const totalPage = Math.ceil(courses.length / 5);

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
                {new Array(totalPage).map((page) => (
                    <li className="page-item mr-2" key={page} onClick={() => setCurrentPage(page)}>
                        {page + 1}
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
