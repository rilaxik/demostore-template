import { JSX } from 'react';

const PageWrapper = ({ children, container }: Props) => {
  return (
    <div
      style={
        !container
          ? {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem'
            }
          : {
              display: 'flex',
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

type Props = {
  children: JSX.Element | JSX.Element[];
  container?: boolean;
};
