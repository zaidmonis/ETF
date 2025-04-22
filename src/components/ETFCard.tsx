import styled from 'styled-components'

export const ETFCard = styled.div`
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.primary3};
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  h3 {
    font-family: 'Georgia', serif;
    color: ${({ theme }) => theme.text1};
    border-bottom: 1px solid ${({ theme }) => theme.primary3};
    padding-bottom: 0.5rem;
  }
`
