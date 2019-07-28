import React, { ReactNode, CSSProperties } from 'react';
import { Box } from '@material-ui/core';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

export default function({ children, style }: Props): JSX.Element {
  return (
    <Box style={{ height: 'calc(100vh - 56px)', overflow: 'auto', ...style }}>
      {children}
    </Box>
  );
}
