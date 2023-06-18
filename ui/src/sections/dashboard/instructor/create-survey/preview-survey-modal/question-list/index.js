import PropTypes from 'prop-types';
import React, { useState } from 'react';
import QuestionListPagination from './QuestionListPagination';

QuestionList.propTypes = {
    questions: PropTypes.array
};

export default function QuestionList({ questions }) {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <>
            {questions.slice(currentPage, currentPage + 1).map((question) => (
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{question.sentence}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{question.options.length ? 'Selection' : 'Text'}</h6>
                        {question.options?.length ? (
                            <div>
                                <ul className="list-group">
                                    {question.options.map((option) => (
                                        <li className="list-group-item">{option}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
            <QuestionListPagination setCurrentPage={setCurrentPage} currentPage={setCurrentPage} list={questions} />
        </>
    );
}
