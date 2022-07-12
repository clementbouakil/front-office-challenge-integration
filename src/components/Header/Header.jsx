import { Col, Row, Typography } from 'antd';
import './header.css';

const { Title } = Typography;

const Header = ({ title }) => (
	<Row>
		<Col span={24}>
			<div className="header">
				<Title>{title}</Title>
			</div>
		</Col>
	</Row>
);

export default Header;
