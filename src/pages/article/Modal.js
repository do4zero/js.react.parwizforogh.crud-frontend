import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import placeholder from '../../images/placeholder.jpg';

import { create, update } from './services/controllers';

const CrudModal = ({
  formTitle,
  show,
  handleClose,
  handleLoadData,
  bindArticle,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [isSubmit, setSumbit] = useState(false);
  const [id, setId] = useState(null);
  const CREATETEXT = 'Create Article';
  const EDITTEXT = 'Edit Article';

  const onSubmit = async (data) => {
    try {
      setSumbit(true);
      if (formTitle === 'create') {
        await create(data);
      } else {
        await update(data, id);
      }
      setSumbit(false);
      handleLoadData();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    function () {
      clearErrors(['title', 'excerpt']);
      reset(
        {
          title: '',
          excerpt: '',
        },
        {
          keepErrors: true,
          keepDirty: true,
        }
      );
    },
    [clearErrors, show, reset]
  );

  useEffect(
    function () {
      if (bindArticle) {
        setValue(
          'title',
          bindArticle.title ? bindArticle.title : null,
          { shouldValidate: true }
        );
        setValue(
          'excerpt',
          bindArticle.description ? bindArticle.description : null,
          { shouldValidate: true }
        );
        setValue(
          'image',
          bindArticle.image || bindArticle.image !== ''
            ? bindArticle.image
            : null,
          { shouldValidate: true }
        );
        setId(bindArticle.id);
      }
    },
    [bindArticle, setValue]
  );

  if (formTitle === 'view') {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          {show && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>View Article</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Form.Label htmlFor='basic-url'>Title</Form.Label>
                  <p>{bindArticle.title ? bindArticle.title : ''}</p>
                </div>
                <br />
                <div>
                  <Form.Label htmlFor='basic-url'>Excerpt</Form.Label>
                  <p>
                    {bindArticle.description
                      ? bindArticle.description
                      : ''}
                  </p>
                </div>
                <br />
                <div>
                  <Form.Label htmlFor='basic-url'>Image</Form.Label>
                  <Card.Img
                    variant='top'
                    className='image'
                    src={bindArticle.image}
                    onError={(e) => {
                      if (e.target.onerror == null) {
                        e.target.src = placeholder;
                      }
                    }}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='danger'
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {show && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {formTitle
                  ? formTitle === 'create'
                    ? CREATETEXT
                    : EDITTEXT
                  : CREATETEXT}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form.Label htmlFor='basic-url'>Title</Form.Label>
                <Form.Control
                  name='title'
                  placeholder='Title of article here...'
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <span style={{ color: 'red' }}>
                    This field is required
                  </span>
                )}
              </div>
              <br />
              <div>
                <Form.Label htmlFor='basic-url'>Excerpt</Form.Label>
                <Form.Control
                  name='excerpt'
                  as='textarea'
                  placeholder='Excerpt of article here...'
                  {...register('excerpt', { required: true })}
                />
                {errors.excerpt && (
                  <span style={{ color: 'red' }}>
                    This field is required
                  </span>
                )}
              </div>
              <br />
              <div>
                <Form.Label htmlFor='basic-url'>Image</Form.Label>
                <Form.Control
                  placeholder='Source of Image here...'
                  aria-label='Image'
                  aria-describedby='image'
                  {...register('image')}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='danger'
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={isSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </>
  );
};

export default CrudModal;
