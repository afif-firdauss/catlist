import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Service from '../utils/service';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Detail = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const service = new Service();

  const [detail, setDetail] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const data = detail?.breeds?.[0];

  const getDetail = async () => {
    setIsFetching(true);
    service
      .getItem(id)
      .then((data) => {
        setDetail(data);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
        navigate('/not-found')
      });
  };

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  if (isFetching) return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="grow" variant="info" />
    </div>
  )

  return (
    <Container>
      <h1 className='d-flex justify-content-center mt-3 mb-5'>{data?.name}</h1>
      <Link to="/">
        <Button variant="primary">Back</Button>
      </Link>
      
      <Row className='pb-5 mt-3'>
        <Col className='pb-5' sm="auto">
          <Image src={detail?.url} thumbnail className='cat-image' loading='eager' />
        </Col>
        <Col>
          <div className='mb-3'>{data?.description}</div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Detail</Accordion.Header>
              <Accordion.Body className='pb-4'>
                <div className='mb-3'>
                  <div className='mb-2'>Adaptability</div>
                  <ProgressBar variant="warning" now={data?.adaptability} max={5} />
                </div>
                <div className='mb-3'>
                  <div className='mb-2'>Child Friendly</div>
                  <ProgressBar variant="warning" now={data?.child_friendly} max={5} />
                </div>
                <div className='mb-3'>
                  <div className='mb-2'>Health Issues</div>
                  <ProgressBar variant="warning" now={data?.health_issues} max={5} />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}

export default Detail