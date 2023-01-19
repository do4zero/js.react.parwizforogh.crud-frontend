import Card from 'react-bootstrap/Card';
import placeholder from '../../images/placeholder.jpg';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePen,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function CrudCard({
  title,
  description,
  date,
  image,
  handleEditArticle,
  handleDeleteArticle,
  handleViewArticle,
}) {
  return (
    <Card style={{ width: '18rem' }}>
      <div
        style={{
          position: 'relative',
          height: '180px',
          overflow: 'hidden',
        }}
      >
        {image ? (
          <Card.Img
            variant='top'
            className='image'
            src={image}
            onError={(e) => {
              if (e.target.onerror == null) {
                e.target.src = placeholder;
              }
            }}
          />
        ) : (
          <Card.Img
            variant='top'
            className='image'
            src={placeholder}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          <ButtonGroup aria-label='Basic example'>
            <Button
              variant='default'
              size='sm'
              style={{ color: '#fff' }}
              onClick={handleEditArticle}
            >
              <FontAwesomeIcon icon={faFilePen} />
            </Button>
            <Button
              variant='default'
              size='sm'
              style={{ color: '#fff' }}
              onClick={handleDeleteArticle}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              variant='default'
              size='sm'
              style={{ color: '#fff' }}
              onClick={handleViewArticle}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div style={{ textAlign: 'right', fontSize: '14px' }}>
          Created at{' '}
          <small className='text-muted'>
            {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
          </small>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default CrudCard;
