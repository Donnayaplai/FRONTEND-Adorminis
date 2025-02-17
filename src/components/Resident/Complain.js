import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ResidentComplainList from './ResidentComplainList';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { TiWarningOutline } from 'react-icons/ti';
import { AiFillWarning } from 'react-icons/ai';

const ResidentComplain = (props) => {
  const history = useHistory();
  const [complainList, setComplainList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredComplain, setFilteredComplain] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [complainModalOpen, setComplainModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    if (props.roleId !== 0) {
      history.push('/login');
    } else {
      getAllResidentProblems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setComplainModalOpen(false);
  const handleShow = () => setComplainModalOpen(true);

  //Search filter
  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
    let copyComplainList = [...complainList];
    setFilteredComplain(
      copyComplainList.filter(
        (complain) =>
          complain.INFORMEDDATE.includes(text) || complain.TITLE.includes(text)
      )
    );
  };

  //Get all problems
  let getAllResidentProblems = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${env.url}complaint/history/${props.rentId}`
      );
      setComplainList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = complainList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  let submitValue = async () => {
    try {
      let inputs = {
        title: title,
        detail: detail,
      };
      await axios
        .post(
          `${env.url}complaint/send/${props.rentId}/${props.dormId}`,
          inputs
        )
        .then(window.alert('การแจ้งปัญหาเสร็จสิ้น'))
        .then(setComplainModalOpen(false))
        .then(setTitle(''))
        .then(setDetail(''))
        .then(() => {
          getAllResidentProblems();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const Cancle = async () => {
    setComplainModalOpen(false);
    setTitle('');
    setDetail('');
  };

  return (
    <>
      <h1>
        เรื่องร้องเรียน &nbsp;
        <i className="fas fa-comment-dots"></i>
      </h1>
      <Row className="mt-3 mb-3">
        <Col xs={8} sm={8} md={6} className="mx-auto">
          <Search
            handleSearchInput={handleSearchInput}
            searchText={searchText}
            className="mx-auto"
            placeholder={'โปรดระบุวันที่แจ้งเรื่อง,ชื่อเรื่อง เพื่อค้นหา...'}
          />
        </Col>
      </Row>
      {loading ? (
        <h2 className="text-center fs-3 mt-5">Loading...</h2>
      ) : (
        <Container className="w-75">
          <Row>
            <Col xs={8} sm={7} md={6}>
              <h3>ประวัติและสถานะ</h3>
            </Col>
            <Col xs={4} sm={5} md={6}>
              <Button
                variant="secondary"
                onClick={handleShow}
                style={{ float: 'right' }}
              >
                แจ้งปัญหา <TiWarningOutline />
              </Button>
            </Col>
            <ResidentComplainList
              complainList={currentData}
              loading={loading}
              filteredComplain={filteredComplain}
              searchText={searchText}
              rentId={props.rentId}
              getAllResidentProblems={getAllResidentProblems}
            />
            {complainList.length > 0 ? (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalData={complainList.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            ) : (
              <></>
            )}
          </Row>
        </Container>
      )}

      <Form>
        <Modal
          show={complainModalOpen}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton onClick={Cancle}>
            <Modal.Title>
              <h2>
                แจ้งปัญหา <AiFillWarning />
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#EAE7E2' }}>
            <Container className="px-3 py-3 rounded mb-3">
              <Form.Group className="mb-3">
                <Form.Label>ชื่อเรื่อง</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="โปรดระบุปัญหาที่ต้องการแจ้ง"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control
                  type="text"
                  rows={3}
                  name="detail"
                  onChange={(e) => setDetail(e.target.value)}
                />
              </Form.Group>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Cancle}>
              ยกเลิก
            </Button>
            <Button variant="primary" type="submit" onClick={submitValue}>
              ตกลง
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};

export default ResidentComplain;
