import React, { useRef } from 'react'
import { Info, BookOpen, Map, DollarSign, ShoppingCart, HelpCircle } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'
import { useDarkModeManager } from '../../state/user/hooks'
import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/svg/logo_white.svg'

import { ExternalLink } from '../../theme'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 220px;
  background-color: ${({ theme }) => theme.bg2};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  position: absolute;
  top: 3rem;
  right: 0;
  z-index: 100;
  border: 1px solid ${({ theme }) => theme.primary3};
  transition: all 0.2s ease-in-out;
`

const MenuItem = styled(ExternalLink)`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 4px 0;
  color: ${({ theme }) => theme.text2};
  border-radius: 8px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.primary1 + '15'};
    color: ${({ theme }) => theme.primary1};
    transform: translateX(2px);

    > svg {
      color: ${({ theme }) => theme.primary1};
    }
  }

  > svg {
    margin-right: 12px;
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.text2};
    transition: color 0.15s ease-in-out;
  }
`

const MenuHeader = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.primary1};
    font-weight: 600;

    > img {
      width: 24px;
      height: 24px;
    }
  }
`

export default function Menu() {
  const [isDark] = useDarkModeManager()
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuHeader>
            <div>
              <img src={isDark ? LogoDark : Logo} alt="logo" />
              Resources
            </div>
          </MenuHeader>
          <MenuItem id="link" href="https://etfswap.gitbook.io/etfswap/">
            <Info size={16} />
            About ETFswap
          </MenuItem>
          <MenuItem id="link" href="https://etfswap.gitbook.io/etfswap/etfswap/introduction">
            <BookOpen size={16} />
            Documentation
          </MenuItem>
          <MenuItem id="link" href="https://etfswap.gitbook.io/etfswap/etfswap/roadmap">
            <Map size={16} />
            Roadmap
          </MenuItem>
          <MenuItem id="link" href="https://etfswap.gitbook.io/etfswap/etfswap/tokenomics">
            <DollarSign size={16} />
            Token Economics
          </MenuItem>
          <MenuItem id="link" href="https://etfswap.gitbook.io/etfswap/etfswap/how-to-buy-etf">
            <ShoppingCart size={16} />
            Get ETF Tokens
          </MenuItem>
          <MenuItem id="link" href="https://etfswap.gitbook.io/etfswap/etfswap/faqs">
            <HelpCircle size={16} />
            FAQs
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
