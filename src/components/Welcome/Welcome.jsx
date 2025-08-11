import React from "react";
import icons from "../../images/sprite.svg";
import {
  Container,
  Wrapper,
  Logo,
  LogoWrapper,
  Icon,
  Title,
  Text,
  AuthWrapper,
  AuthButton,
  AuthButtonLogin,
  WrapperBackground,
} from "./Welcome.styled";
import Footer from "../Footer/Footer";

function Welcome() {
  return (
    <Container>
      <WrapperBackground />
      <Wrapper>
        <Logo />
        <LogoWrapper>
          <Icon>
            <use href={`${icons}#logo`} />
          </Icon>
          <Title>GabyTrade C-Bots Platform</Title>
        </LogoWrapper>
        <Text>
          Automate your forex strategies with powerful C-Bots powered by Gaby.
          <br />
          <br />
          Trade smarter, not harder. Automate your strategies with Gaby's
          trading robots.
        </Text>

        <AuthWrapper>
          <AuthButton to="/auth/register" className="register">
            Registration
          </AuthButton>
          <AuthButtonLogin to="/auth/login" className="login">
            Log In
          </AuthButtonLogin>
        </AuthWrapper>
      </Wrapper>
      <Footer style={{ position: "relative", zIndex: 3 }} />
    </Container>
  );
}

export default Welcome;
