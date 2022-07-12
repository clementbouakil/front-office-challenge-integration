import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col } from 'antd';
import './carousel-button.css';

const CarouselButton = ({ className, onClick, isPrev }) => {
	return (
		<Col span={1}>
			<div className={className}>
				<Button
					size="large"
					shape="circle"
					onClick={onClick}
					icon={isPrev ? <LeftOutlined /> : <RightOutlined />}
				/>
			</div>
		</Col>
	);
};

export default CarouselButton;
