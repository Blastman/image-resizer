import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ExportInformation from './export/ExportInformation';

interface Props {
  filesSelected: boolean;
}

const RunControls = ({ filesSelected }: Props) => {
  const [configureOpen, setConfigureOpen] = useState(false);

  return (
    <div className="run-controls footer">
      {configureOpen && (
        <ExportInformation
          onClose={() => {
            console.log('set open to false');
            setConfigureOpen(false);
          }}
        />
      )}
      <Row>
        <Col>
          <Button onClick={() => setConfigureOpen(true)}>Configure Batch</Button>
        </Col>
        <Col>
          <Button disabled={!filesSelected}>Convert!</Button>
        </Col>
      </Row>
    </div>
  );
};

export default RunControls;
