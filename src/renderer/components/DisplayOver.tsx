import React, { CSSProperties, ReactNode } from 'react';

const styles: CSSProperties = {
  height: '100%',
  left: '0',
  position: 'absolute',
  top: '0',
  width: '100%',
  zIndex: 2,
  transition: 'background-color 350ms ease',
  backgroundColor: 'transparent',
  padding: '20px 20px 0 20px',
  boxSizing: 'border-box'
};

interface Props {
  children: ReactNode;
}

const DisplayOver = ({ children }: Props) => <div style={styles}>{children}</div>;

export default DisplayOver;