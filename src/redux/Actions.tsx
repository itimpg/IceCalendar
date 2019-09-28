
import { AnyAction } from "redux";
import { ActionTypes } from "./ActionTypes";
import { CalendarItemModel } from "../models/CalendarItemModel";
import { Filter } from "../models/Filter";

export function saveCalendarItem(calendarItem: CalendarItemModel, yearMonthId: string): AnyAction {
    return {
        type: ActionTypes.SAVE_CALENDARITEM,
        calendarItem,
        yearMonthId,
    }
}

export function deleteCalendarItem(calendarItem: CalendarItemModel, yearMonthId: string): AnyAction {
    return {
        type: ActionTypes.DELETE_CALENDARITEM,
        calendarItem,
        yearMonthId
    }
}

export function updateFilter(filter: Filter): AnyAction {
    return {
        type: ActionTypes.UPDATE_FILTER,
        filter
    }
}