import { Col, Typography } from 'antd';
import './section.css';

const { Title } = Typography;

const Section = ({ title, children }) => (
	<Col span={24} className="section">
		<div className="section-title">
			<Title level={3}>{title}</Title>
		</div>
		{children}
	</Col>
);

export default Section;
