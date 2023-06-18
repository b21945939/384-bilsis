import PropTypes from 'prop-types';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Yup from 'yup';
import { USER_TYPES } from '../../../../config';

const searchSchema = Yup.object().shape({
    query: Yup.string().required('Required'),
    userType: Yup.string().required('Required')
});

SearchUserForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setUserType: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired
};

export default function SearchUserForm({ setUser, user, setUserType, userType, users }) {
    return (
        <Row>
            <Col md={10}>
                <Typeahead id="basic-user-search" labelKey="email" onChange={setUser} options={users} placeholder="Search users..." selected={user} />
            </Col>

            <Col md={2}>
                <Form.Group>
                    <Form.Control as="select" value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Select User Type</option>
                        {Object.values(USER_TYPES).map((userType) => (
                            <option key={userType} value={userType}>
                                {userType}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    );
}
