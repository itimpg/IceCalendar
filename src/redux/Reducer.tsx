import { combineReducers, AnyAction } from "redux";
import { ActionTypes } from "./ActionTypes";
import { CalendarCode } from "../models/CalendarCode";
import { Filter } from "../models/Filter";
import CalendarItemCodeData from '../data/CalendarItemCodeData';
import { CalendarItemModel } from "../models/CalendarItemModel";
import initData from '../data/CalendarTestData';
import moment from 'moment';

function calendarCodes(state: CalendarCode[] = CalendarItemCodeData, action: AnyAction) {
    return state;
}

const defaultFilter = Number(moment().format("YYYYMM"));

function filter(state: Filter = { yearMonthId: defaultFilter }, action: AnyAction) {

    if (action.type === ActionTypes.UPDATE_FILTER) {
        state.yearMonthId = action.yearMonthId;
    }
    return state;
}

function calendarItems(
    state: any = initData,
    action: AnyAction) {

    switch (action.type) {
        case ActionTypes.SAVE_CALENDARITEM:
            const item : CalendarItemModel = state[action.yearMonthId].find((x: CalendarItemModel) => x.id === action.calendarItem.id);
            item.code = action.calendarItem.code;
            item.startTime = action.calendarItem.startTime;
            item.endTime = action.calendarItem.endTime;
    }
    return state;
}

const rootReducer = combineReducers({ calendarItems, calendarCodes, filter });

export default rootReducer;