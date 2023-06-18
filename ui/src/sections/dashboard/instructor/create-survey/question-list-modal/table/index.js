import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TablePagination from '../../../../department-manager/assign-instructor/table/TablePagination';

QuestionTable.propTypes = {
    questions: PropTypes.array,
    toggleSelected: PropTypes.func
};

export default function QuestionTable({ questions, toggleSelected }) {
    const [currentPage, setCurrentPage] = useState(1);

    const calculateIndex = (currentPage) => {
        const length = questions.length;

        if (length < 10) {
            return [0, length - 1];
        } else if (currentPage * 10 > length) {
            return [length - 10, length - 1];
        } else {
            return [currentPage * 10 - 10, currentPage * 10 - 1];
        }
    };

    const [start, end] = calculateIndex(currentPage);
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Type</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.slice(start, end + 1).map((question) => (
                        <tr key={question.id}>
                            <th scope="row">{question.sentence}</th>
                            <td>{question.options.length ? 'Multiple Choice' : 'Text'}</td>
                            <td>
                                <button onClick={() => toggleSelected(question.id)} className="btn btn-primary">
                                    {question.selected ? 'Discard' : 'Add'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination setCurrentPage={setCurrentPage} currentPage={setCurrentPage} courses={questions} />
        </>
    );
}
