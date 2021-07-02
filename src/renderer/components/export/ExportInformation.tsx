import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ImageBatch } from '../typings';
import { useFormik } from 'formik';
import { boolean, number, object, string } from 'yup';
import NewWindowComponent from './NewWindowComponent';

const validationSchema = object({
  convertToType: string(),
  keepFileType: boolean(),
  maxFileSize: number().min(1),
  maxHeight: number().min(1),
  maxWidth: number().min(1),
  name: string(),
  shrinkPercent: number()
    .min(1)
    .max(100)
});

interface Props {
  onClose: () => void;
}

const ExportInformation = ({ onClose }: Props) => {
  const [batchOptions, setBatchOptions] = useState<ImageBatch>({
    convertToType: undefined,
    keepFileType: true,
    // maxFileSize: 0,
    // maxHeight: 0,
    // maxWidth: 0,
    name: ''
    // shrinkPercent: 0
  });

  const formik = useFormik({
    initialValues: {
      convertToType: undefined,
      keepFileType: true,
      maxFileSize: undefined,
      maxHeight: undefined,
      maxWidth: undefined,
      name: '',
      shrinkPercent: undefined
    },
    validationSchema,
    onSubmit: values => {
      // Do something...
      console.log('submitted values: ', values);
    }
  });

  return (
    <NewWindowComponent onClose={onClose} windowName="ImageConverterConfig">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Row>
            <Col>
              <p>Dont convert file type(s)</p>
            </Col>
            <Col>
              <input type="checkbox" />
            </Col>
          </Row>
          <Row>
            <Col>Convert To Type:</Col>
            <Col>
            </Col>
          </Row>
        </div>
      </form>
    </NewWindowComponent>
  );
};

export default ExportInformation;
