import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './carousel-button.css';

const CarouselButton = ({ className, onClick, isPrev }) => {
	return (
		<div className={className}>
			<Button
				size="large"
				shape="circle"
				onClick={onClick}
				icon={isPrev ? <LeftOutlined /> : <RightOutlined />}
			/>
		</div>
	);
};

export default CarouselButton;
