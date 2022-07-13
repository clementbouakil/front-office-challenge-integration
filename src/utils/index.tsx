import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import 'moment/locale/fr';
import { DataType } from '../interfaces';
import { Medal } from '../types';

moment.locale('fr');

export const formatDate = (date: string) =>
	moment.unix(parseInt(date)).format('DD/MM/YYYY - hh:mm');

export const medalsSelector = (arr: Medal[]) =>
	arr.map((item: Medal) => ({
		key: item?.key,
		country: item?.country,
		gold: item?.medals?.gold,
		silver: item?.medals?.silver,
		bronze: item?.medals?.bronze,
		total: item?.medals?.gold + item?.medals?.silver + item?.medals?.bronze,
	}));

export const columns: ColumnsType<DataType> = [
	{ title: 'Pays', dataIndex: 'country', key: 'country' },
	{
		key: 'gold',
		title: 'Or',
		dataIndex: 'gold',
		sorter: (a: any, b: any) => a.gold - b.gold,
	},
	{
		key: 'silver',
		title: 'Argent',
		dataIndex: 'silver',
		sorter: (a: any, b: any) => a.silver - b.silver,
	},
	{
		key: 'bronze',
		title: 'Bronze',
		dataIndex: 'bronze',
		sorter: (a: any, b: any) => a.bronze - b.bronze,
	},
	{
		key: 'total',
		title: 'Total',
		dataIndex: 'total',
		defaultSortOrder: 'descend',
		sorter: (a: any, b: any) => a.total - b.total,
	},
];
