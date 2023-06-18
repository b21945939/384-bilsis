import PropTypes from 'prop-types';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

SearchInstructorForm.propTypes = {
    setInstructor: PropTypes.func
};

export default function SearchInstructorForm({ selectedInstructor, setSelectedInstructor, instructors }) {
    return (
        <div className="row">
            <div className="col-12">
                <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="email"
                    onChange={setSelectedInstructor}
                    options={instructors}
                    placeholder="Choose several states..."
                    selected={selectedInstructor}
                />
            </div>
        </div>
    );
}
