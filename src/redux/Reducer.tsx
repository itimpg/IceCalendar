import { combineReducers, AnyAction } from "redux";
import { ActionTypes } from "./ActionTypes";
import { CalendarCode } from "../models/CalendarCode";
import { Filter } from "../models/Filter";
import CalendarItemCodeData from '../data/CalendarItemCodeData';
import { CalendarItemModel } from "../models/CalendarItemModel";
import mockData from '../data/CalendarTestData';

function calendarCodes(state: CalendarCode[] = CalendarItemCodeData, action: AnyAction) {
    return state;
}

function zfill(num: string, len: number) {
    return (Array(len).join("0") + num).slice(-len);
}

function getYearMonthId(filter: Filter): string {
    return `${filter.filterYear}${zfill((filter.filterMonth).toString(), 2)}`;
}

function filter(
    state: Filter = {
        filterMonth: new Date().getMonth(),
        filterYear: new Date().getFullYear(),
        yearMonthId: ''
    },
    action: AnyAction) {

    switch (action.type) {
        case ActionTypes.UPDATE_FILTER:
                debugger;
            action.filter.yearMonthId = getYearMonthId(action.filter);
            return action.filter;
        default:
            state.yearMonthId = getYearMonthId(state);
            return state;
    }
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
            debugger;
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