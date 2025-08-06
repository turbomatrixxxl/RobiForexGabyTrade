import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
// import logoMob from '../../images/user2.png';
// import logoDesk from '../../images/user.png';
import robyImage from '../../images/Roby.jpg';
import backgroundImage from '../../images/register-background.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: var(--gradient-background);;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  position: relative;
`;

export const WrapperBackground = styled.div`
        background : transparent url(${backgroundImage}) no-repeat center center;
        background-position: 50%;
        background-size: cover;
        display: inherit
;
        height: 100%;
        left: 0;
        opacity: .5;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  position: relative;
  z-index: 3;
`;

export const Logo = styled.img`
  content: url(${robyImage});
  border-radius: 10px;
  width: 124px;
  height: 124px;
  margin-bottom: 14px;

  @media screen and (min-width: 768px) {
    width: 162px;
    height: 162px;
    margin-bottom: 24px;
  }
`;


export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 14px;
`;

export const Icon = styled.svg`
  height: 40px;
  width: 40px;

  @media screen and (min-width: 768px) {
    height: 48px;
    width: 48px;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -1.12px;
  color: var(--white-60, #fff9);
  flex-shrink: 1;

  @media screen and (min-width: 380px) {
    font-size: 28px;
  }

  @media screen and (min-width: 768px) {
    font-size: 40px;
    letter-spacing: -1.6px;
  }
`;

export const Text = styled.p`
  width: 315px;
  margin-top: 25px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.28;
  letter-spacing: -0.28px;
  color: var(--white-60, #fff9);;
  text-align: center;
  text-wrap: wrap;
  flex-shrink: 1;

  @media screen and (min-width: 380px) {
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
    width: 473px;
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 48px;

  & .login:hover + .register {
    background: transparent;
    color: var(--text-hover-welcome-color);
  }
`;

export const AuthButton = styled(NavLink)`
  width: 335px;
  padding: 14px 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.28px;
  background: var(--bg-welcome-color);
  color: var(--text-hover-welcome-color);
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: none;
  transition: all 250ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 345px) {
    width: 300px;
  }

  @media screen and (min-width: 768px) {
    width: 344px;
  }
`;

export const AuthButtonLogin = styled(NavLink)`
  width: 335px;
  padding: 14px 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.28px;
  color: var(--white-60, #fff9);;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: none;
  transition: all 250ms ease-in-out;

  &:hover {
    background: var(--bg-welcome-color);
    color: var(--text-hover-welcome-color);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 345px) {
    width: 300px;
  }

  @media screen and (min-width: 768px) {
    width: 344px;
  }
`;
