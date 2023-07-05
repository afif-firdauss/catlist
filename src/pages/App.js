import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import debounce from 'lodash/debounce';
import Service from '../utils/service';
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const service = new Service();

  const [item, setItem] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const limit = 10;

  const getListItem = async () => {
    setIsFetching(true);
    service
      .getListItem(limit, page)
      .then((data) => {
        if (data?.length < limit) {
          setHasMoreItems(false);
        }
        setPage(page + 1)
        setItem([...item, ...data]);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  const searchItem = (value) => {
    setIsFetching(true);
    service.searchItem(value).then((data) => {
      setItem(data);
      setFilter(value);
      setPage(1);
      setIsFetching(false);
    })
    .catch(() => setIsFetching(false));
  }

  const changeHandler = (e) => {
    const value = e.target.value;
    if (value) {
      searchItem(value)
    } else {
      getListItem();
      setFilter();
      setHasMoreItems(true);
    }
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 350), []);

  useEffect(() => {
    getListItem()
  }, []);

  return (
    <Container>
      <h1 className='d-flex justify-content-center mt-3 mb-5'>The Cat</h1>
      <div className='d-flex justify-content-center mt-3 mb-5'>
        <Form.Group as={Col} md="4" controlId="validationFormikUsername">
          <Form.Control
            type="text"
            onChange={debouncedChangeHandler}
            placeholder='search cat...'
          />
        </Form.Group>
      </div>
      <Row>
        <Col className='pb-5'>
          <InfiniteScroll
            next={getListItem}
            hasMore={hasMoreItems && !isFetching && !filter}
            dataLength={item?.length}
            className='cat-list mb-5'>
              {item?.map((data, index) => (
                <div key={index} className='d-flex justify-content-center align-items-center'>
                  <Link to={`/cat/${data?.reference_image_id ?? data?.id}`}>
                    <Image src={data?.image?.url ?? data?.url} thumbnail className='cat-image' />
                  </Link>
                </div>
              ))}
          </InfiniteScroll>

          {hasMoreItems && isFetching ? (
            <div className="d-flex justify-content-center align-items-center my-4">
              <Spinner animation="grow" variant="info" />
            </div>
          ) : isFetching ? (
            <div className="d-flex justify-content-center align-items-center my-4">
              <Spinner animation="grow" variant="info" />
            </div>
          ) : null}
        </Col>
        {item?.length < 1 && !isFetching && (
          <div className="d-flex justify-content-center align-items-center my-4">No cat found!</div>
        )}
      </Row>
    </Container>
  )
}

export default App;
