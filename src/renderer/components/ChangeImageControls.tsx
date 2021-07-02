import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { RotateCcw, RotateCw, XCircle } from 'react-feather';
import HoverIcon from './HoverIcon';

interface Props {
  onMouseOut: () => void;
  onRemove: () => void;
  onRotateCw: () => void;
  onRotateCcw: () => void;
}

const ChangeImageControls = ({ onMouseOut, onRemove, onRotateCw, onRotateCcw }: Props) => {
  return (
    <div className="image-controls h-100" onMouseLeave={onMouseOut}>
      <Row className="h-100">
        <Col>
          <div className="h-100 d-flex flex-column">
            <Row className="ml-auto pr-3">
              <HoverIcon icon={XCircle} color="red" onClick={onRemove} />
            </Row>
            <Row className="flex-grow-1 align-items-end">
              <Col xs={6} className="align-bottom">
                <HoverIcon icon={RotateCcw} onClick={onRotateCcw} />
              </Col>
              <Col xs={6} className="text-right">
                <HoverIcon icon={RotateCw} onClick={onRotateCw} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangeImageControls;
