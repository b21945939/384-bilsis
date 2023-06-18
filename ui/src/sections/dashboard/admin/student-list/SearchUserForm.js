import PropTypes from 'prop-types';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Yup from 'yup';

const searchSchema = Yup.object().shape({
    query: Yup.string().required('Required')
});

SearchUserForm.propTypes = {
    selectedUsers: PropTypes.array.isRequired,
    setSelectedUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default function SearchUserForm({ users, setSelectedUsers, selectedUsers }) {
    return (
        <div className="row">
            <div className="col-12">
                <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="email"
                    onChange={setSelectedUsers}
                    options={users}
                    placeholder="Choose several states..."
                    selected={selectedUsers}
                />
            </div>
        </div>
    );
}
