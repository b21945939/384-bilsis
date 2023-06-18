import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';
import Header from './header';
import SideBar from './side-bar';

export default function GenericLayout() {
    return (
        <Container
            style={{
                minWidth: '100vw'
            }}
        >
            <div className="col">
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    <div className="col sidebar col-sm-4 col-md-3 col-lg-4 col-xl-3 px-0">
                        <SideBar />
                    </div>
                    <div className="col content col-sm-8 col-md-9 col-lg-8 col-xl-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </Container>
    );
}
