import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './Modal';
import Confirm from './Confirm';
import Card from './Card';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './articles.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Services
import { fetch, fetchOne } from './services/controllers';

const Index = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setId] = useState(null);
  const [formTitle, setFormTitle] = useState('create');
  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);
  const [bindArticle, setBindArticle] = useState(null);

  // Handle Operation Crud
  const handleCreateArticle = () => {
    setShow(true);
  };

  const handleEditArticle = async (id) => {
    setFormTitle('edit');
    const response = await fetchOne(id);
    const data = { ...response, id };
    setBindArticle(data);
    setShow(true);
  };

  const handleDeleteArticle = (id) => {
    setShowConfirm(true);
    setId(id);
  };

  const handleViewArticle = async (id) => {
    setFormTitle('view');
    const response = await fetchOne(id);
    const data = { ...response, id };
    setBindArticle(data);
    setShow(true);
  };

  const onChangeSearch = (e) => {
    const filteredArticles = articlesFiltered.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  // Handle Closing Modal
  const handleClose = () => {
    setShow(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  // fetching data from endpoint
  async function handleLoadData() {
    const data = await fetch();
    // set data for load
    setArticles(data);

    // set data for filter
    setArticlesFiltered(data);
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <>
      <div className='articles'>
        <Container fluid>
          <div style={{ margin: '30px 0px' }}>
            <div
              style={{
                textAlign: 'center',
                fontWeight: '500',
                marginBottom: '10px',
              }}
            >
              Search Your Favourite Article Here
            </div>
            <InputGroup>
              <Form.Control
                placeholder='Search...'
                onChange={onChangeSearch}
              />
            </InputGroup>
          </div>

          <div
            className='right'
            style={{ marginBottom: '30px', marginTop: '40px' }}
          >
            <Button variant='primary' onClick={handleCreateArticle}>
              <FontAwesomeIcon icon={faPlusSquare} /> Create Article
            </Button>
          </div>

          <Row>
            {articles.length > 0 ? (
              articles.map((item) => (
                <Col
                  style={{ marginBottom: '20px' }}
                  key={item.id}
                  md={3}
                >
                  <Card
                    {...item}
                    handleEditArticle={() => {
                      handleEditArticle(item.id);
                    }}
                    handleDeleteArticle={() => {
                      handleDeleteArticle(item.id);
                    }}
                    handleViewArticle={() => {
                      handleViewArticle(item.id);
                    }}
                  />
                </Col>
              ))
            ) : (
              <Col>
                <Alert key='warning' variant='warning'>
                  <div style={{ textAlign: 'center' }}>
                    Article is Empty.
                  </div>
                </Alert>
              </Col>
            )}
          </Row>
        </Container>

        <Modal
          show={show}
          handleClose={handleClose}
          formTitle={formTitle}
          handleLoadData={handleLoadData}
          bindArticle={bindArticle}
        />

        <Confirm
          show={showConfirm}
          handleClose={handleCloseConfirm}
          handleLoadData={handleLoadData}
          id={id}
        />
      </div>
    </>
  );
};

export default Index;
