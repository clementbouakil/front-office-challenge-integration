import { Card, Typography } from 'antd';
import { formatDate } from '../../utils';
import './event-card.css';

const { Text, Title } = Typography;

const EventCard = ({ pictureUrl, sportTitle, date }) => (
	<Card
		className="event-card"
		cover={
			pictureUrl && <img className="event-picture" src={pictureUrl} alt="" />
		}
	>
		{sportTitle && <Title level={5}>{sportTitle}</Title>}
		{date && (
			<Text style={{ opacity: 0.5, marginTop: 20 }}>{formatDate(date)}</Text>
		)}
	</Card>
);

export default EventCard;
