import { AnyAction } from "redux";
import { ActionTypes } from "./ActionTypes";
import { CalendarItemModel } from "../models/CalendarItemModel";

export function saveCalendarItem(calendarItem: CalendarItemModel, yearMonthId: number): AnyAction {
    return {
        type: ActionTypes.SAVE_CALENDARITEM,
        calendarItem,
        yearMonthId,
    }
} 

export function updateFilter(yearMonthId: number): AnyAction {
    return {
        type: ActionTypes.UPDATE_FILTER,
        yearMonthId
    }
}