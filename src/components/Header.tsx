import { Row, Col } from "react-bootstrap";

type Props = {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {
  return (
      <Row>
        <Col xs={6}>
          <h1>{title}</h1>
        </Col>
      </Row>
  );
}

Header.defaultProps = {
  title: ''
}

export default Header;
