import { CalendarItemModel } from "../models/CalendarItemModel";

export interface MainState {
    isLoading: boolean;
    items: CalendarItemModel[];
}