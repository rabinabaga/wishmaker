import React, { useState, useEffect, useCallback } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import taskImg from "../../assets/images/task.png";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledCollapse,
} from "reactstrap";

function Dashboard() {
  return (
    <>
      <div className="page-content">
        <div className="chat-wrapper d-lg-flex gap-1 mx-n4  p-1">
          <div className="file-manager-content w-100 p-4 pb-0">
            <Row className="mb-4">
              <div className="col-auto order-1 d-block d-lg-none">
                <button
                  type="button"
                  className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn"
                >
                  <i className="ri-menu-2-fill align-bottom"></i>
                </button>
              </div>

              <div className="row">
                <div className="card col-md-2 me-5 py-2">
                  <h6 className="my-5 fw-normal "> Total Donation</h6>
                  <h5 className="fs-18 fw-semibold">Rs.12452</h5>
                </div>
                <div className="card col-md-2 me-5 py-2">
                  <h6 className="my-5 fw-normal "> Total Campaigns</h6>
                  <h5 className="fs-18 fw-semibold">Rs.12452</h5>
                </div>
                <div className="card col-md-2 me-5 py-2">
                  <h6 className="my-5 fw-normal "> Total Users</h6>
                  <h5 className="fs-18 fw-semibold">Rs.12452</h5>
                </div>
                <div className="card col-md-2 me-5 py-2">
                  <h6 className="my-5 fw-normal "> Total People Helped</h6>
                  <h5 className="fs-18 fw-semibold">Rs.12452</h5>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
