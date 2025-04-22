import { ChainId } from '@uniswap/sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/svg/logo_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.5rem;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    order: 1;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  margin-right: 1.5rem;

  :hover {
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-right: 0;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg3};
  border-radius: 12px;
  padding: 8px 12px;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.primary4};

  &:hover {
    background: ${({ theme }) => theme.primary1 + '15'};
    transform: translateY(-1px);
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6px 8px;
    font-size: 0.825rem;
  `};
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  background: ${({ theme }) => theme.primary1};
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  margin-right: 12px;
`

const UniIcon = styled.div`
  transition: transform 0.2s ease;

  img {
    width: 32px;
    height: 32px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  &:hover {
    transform: scale(1.05);
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    img {
      width: 16px;
      height: 16px;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    flex: 1;
    gap: 4px;
  `};
`

const BalanceText = styled(Text)`
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" style={{ width: '100%' }} />
            </UniIcon>
          </Title>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} ETH
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
