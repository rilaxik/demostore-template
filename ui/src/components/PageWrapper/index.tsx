import { JSX } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
  container?: boolean;
};

const PageWrapper = ({ children, container = false }: Props) => {
  return (
    <div
      style={
        !container
          ? {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem'
            }
          : {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              gap: '2rem',
              width: '1400px',
              maxWidth: '1400px'
            }
      }
    >
      {children}
    </div>
  );
};

export default PageWrapper;
