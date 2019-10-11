import moment from 'moment';
import { CalendarItemModel } from '../models/CalendarItemModel';

const key = moment().format("YYYYMM");
const initData: any = {};
initData[key] = [];
for (let i = 0; i < moment().endOf('month').toDate().getDate(); i++) {
    const id = moment().startOf('month').add(i, 'days').format("YYYYMMDD");
    const item: CalendarItemModel = {
        date: moment(id, "YYYYMMDD").toDate(),
        code: 'X',
        id: id,
        startTime: '',
        endTime: '',
    };
    initData[key].push(item);
}

export default initData;