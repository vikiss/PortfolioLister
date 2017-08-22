import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import DetailTags from './DetailTags';

const ProjectDetail = ({ project, filter }) => {
  const { id, title, description, url, year, tags, image } = project;

  const { imageStyle } = styles;

let visibility = true;
if ((filter) && (tags)) {
  visibility = (tags.split(',').indexOf(filter) !== -1);
}
if (visibility) {
  return (
    <Panel id={id}>
        <Row className="show-grid">
          <Col xs={6}>
            <img alt={title} style={imageStyle} src={image} />
          </Col>
          <Col xs={6}>
            <h3>{title}<br />
            <small>{year}</small></h3>
            <p dangerouslySetInnerHTML={{ __html: description }} />
            <p className="breakWord">
              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </p>
            <DetailTags tags={tags} />
          </Col>
        </Row>
      </Panel>
  );
}
return null;
};

const styles = {
  imageStyle: {
    height: 300,
    width: 300
  }
};

export default ProjectDetail;
