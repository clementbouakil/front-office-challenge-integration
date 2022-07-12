import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

export const formatDate = (date: string) =>
	moment.unix(parseInt(date)).format('DD/MM/YYYY - hh:mm');
