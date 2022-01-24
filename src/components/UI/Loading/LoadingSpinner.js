import styled, { keyframes } from 'styled-components';
import { CgSpinner } from 'react-icons/cg';

const LoadingSpinner = () => (
  <Div className='spinner-div'>
    <CgSpinner size={80} className='spinner' />
  </Div>
);

export default LoadingSpinner;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Div = styled.div`
  height: '100%';
  padding: '1rem';
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  .spinner {
    color: coral;
    animation: ${rotate} 0.5s linear infinite;
  }
`;
