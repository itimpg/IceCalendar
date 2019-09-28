import { CalendarItemModel } from "../models/CalendarItemModel";
import { Filter } from "../models/Filter";

export interface MainProps {
    calendarItems: any,
    filter: Filter,
    saveCalendarItem: (item: CalendarItemModel, yearMonthId: string) => void;
    deleteCalendarItem: (item: CalendarItemModel, yearMonthId: string) => void;
    updateFilter: (filter: Filter) => void;
}
