import {
	Carousel,
	Col,
	Divider,
	Empty,
	Layout,
	Row,
	Select,
	Table,
} from 'antd';
import _ from 'lodash';
import React from 'react';
import { CarouselButton, EventCard, Header, Section } from '../components';
import { DataType } from '../interfaces';
import { Event } from '../types';
import { columns, medalsSelector } from '../utils';

const { Option } = Select;
const { Content } = Layout;

const carouselSettings = {
	dots: false,
	arrows: true,
	infinite: false,
	slidesToShow: 3,
	slidesToScroll: 3,
	prevArrow: <CarouselButton onClick={null} className={null} isPrev />,
	nextArrow: <CarouselButton onClick={null} className={null} isPrev={false} />,
};

const App = () => {
	/*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */
	const [medals, setMedals] = React.useState<DataType[] | []>([]);
	const [nextEvent, setNextEvent] = React.useState<Event[] | []>([]);
	const [selectedSports, setSelectedSports] = React.useState<string[]>([]);

	/*
  |--------------------------------------------------------------------------
  | VARIABLES
  |--------------------------------------------------------------------------
  */
	const sports = React.useMemo(
		() =>
			nextEvent && !_.isEmpty(nextEvent)
				? nextEvent.map(({ sportTitle }) => sportTitle)
				: [],
		[nextEvent]
	);

	const events = React.useMemo(
		() =>
			nextEvent && !_.isEmpty(nextEvent)
				? _.filter(nextEvent, ({ sportTitle }) =>
						selectedSports.includes(sportTitle)
				  )
				: [],
		[nextEvent, selectedSports]
	);

	/*
  |--------------------------------------------------------------------------
  | FUNCTION
  |--------------------------------------------------------------------------
  */
	const handleChangeSports = React.useCallback((value: string[]) => {
		setSelectedSports(value);
	}, []);

	const getData = React.useCallback(() => {
		fetch('data.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((myJson) => {
				if (myJson?.nextEvent) {
					setNextEvent(myJson?.nextEvent);
				}

				if (myJson?.medals) {
					setMedals(medalsSelector(myJson?.medals));
				}
			});
	}, []);

	/*
  |--------------------------------------------------------------------------
  | CYCLE LIFE
  |--------------------------------------------------------------------------
  */
	React.useEffect(() => {
		getData();
	}, [getData]);

	React.useEffect(() => {
		if (!_.isEmpty(sports)) {
			setSelectedSports(sports);
		}
	}, [sports]);

	/*
  |--------------------------------------------------------------------------
  | COMPONENTS
  |--------------------------------------------------------------------------
  */
	const Filters = React.useCallback(
		() => (
			<Col span={24}>
				<Select
					allowClear
					mode="multiple"
					defaultValue={sports}
					style={{ width: '100%' }}
					onChange={handleChangeSports}
				>
					{sports && !_.isEmpty(sports)
						? sports.map((sport) => (
								<Option key={sport} value={sport}>
									{sport}
								</Option>
						  ))
						: []}
				</Select>
			</Col>
		),
		[handleChangeSports, sports]
	);

	const Events = React.useCallback(
		() => (
			<Row justify="space-between" align="middle">
				<Col span={1} />
				<Col span={20}>
					{events && !_.isEmpty(events) ? (
						<Carousel {...carouselSettings}>
							{events.map((event) => (
								<EventCard key={event.id} {...event} />
							))}
						</Carousel>
					) : (
						<Empty description={<span>Aucune épreuve de prévu</span>} />
					)}
				</Col>
				<Col span={1} />
			</Row>
		),
		[events]
	);

	/*
  |--------------------------------------------------------------------------
  | MAIN RENDER
  |--------------------------------------------------------------------------
  */
	return (
		<Layout>
			<Header title="JO 2022" />
			<Content className="content">
				<Row>
					<Filters />
					<Section title="Prochaines épreuves" children={<Events />} />
					<Divider />
					<Section
						title="Médailles"
						children={
							<Table pagination={false} dataSource={medals} columns={columns} />
						}
					/>
				</Row>
			</Content>
		</Layout>
	);
};

export default App;
