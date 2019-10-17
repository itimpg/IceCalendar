import { combineReducers, AnyAction } from "redux";
import { ActionTypes } from "./actionTypes";
import { CalendarCode } from "../models/CalendarCode";
import { Filter } from "../models/Filter";
import CalendarItemCodeData from '../data/CalendarItemCodeData';
import { CalendarItemModel } from "../models/CalendarItemModel";
import moment from 'moment';

function calendarCodes(state: CalendarCode[] = CalendarItemCodeData, action: AnyAction) {
    return state;
}

const defaultFilter = Number(moment().format("YYYYMM"));
function filter(state: Filter = { yearMonthId: defaultFilter }, action: AnyAction) {
    if (action.type === ActionTypes.UPDATE_FILTER) {
        return { yearMonthId: action.yearMonthId };
    }
    return state;
}

function calendarItems(
    state: any = [],
    action: AnyAction) {

    switch (action.type) {
        case ActionTypes.LOAD_CALENDARITEMS:
            return fillMonth(action.yearMonthId, action.items);
    }
    return state;
}

function fillMonth(monthYearId: number, dataItems: CalendarItemModel[]): CalendarItemModel[] {
    const currentMonth = moment(monthYearId.toString(), "YYYYMM");
    const initData: CalendarItemModel[] = [];
    for (let i = 0; i < currentMonth.endOf('month').toDate().getDate(); i++) {
        const id = currentMonth.startOf('month').add(i, 'days').format("YYYYMMDD");
        const item: CalendarItemModel = dataItems.find((x: CalendarItemModel) => x.id === id) ||
            {
                id: id,
                date: moment(id, "YYYYMMDD").toDate(),
                code1: 'X',
                code2: 'X',
                isPharmacy: false,
                manualWorkingTime: '',
                note: ''
            };
        initData.push(item);
    }
    return initData;
}

const rootReducer = combineReducers({ calendarItems, calendarCodes, filter });

export default rootReducer;