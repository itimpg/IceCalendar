import { combineReducers, AnyAction } from "redux";
import { ActionTypes } from "./ActionTypes";
import { CalendarCode } from "../models/CalendarCode";
import { Filter } from "../models/Filter";
import CalendarItemCodeData from '../data/CalendarItemCodeData';
import { CalendarItemModel } from "../models/CalendarItemModel";
import mockData from '../data/CalendarTestData';
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
    state: any = mockData,
    action: AnyAction) {
        
    switch (action.type) {
        case ActionTypes.SAVE_CALENDARITEM:
            if (!state[action.yearMonthId]) {
                return { ...state, [action.yearMonthId]: [action.calendarItem] }
            } else {
                return { ...state, [action.yearMonthId]: [...state[action.yearMonthId], action.calendarItem] }
            }
        case ActionTypes.DELETE_CALENDARITEM:
            if (state[action.yearMonthId]) {
                const currentItems: CalendarItemModel[] = state[action.yearMonthId];
                const index = currentItems.findIndex(x => x.id === action.calendarItem.id);
                return {
                    ...state,
                    [action.yearMonthId]: [...currentItems.slice(0, index), ...currentItems.slice(index + 1)]
                };
            }
            break;
    }
    return state;
}

const rootReducer = combineReducers({ calendarItems, calendarCodes, filter });

export default rootReducer;