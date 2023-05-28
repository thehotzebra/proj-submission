export interface users {
    first_name: string;
    last_name: string;
    user_email: string;

}
export interface newEntry {
    payment: string;
    entry_date: Date;
    location: string;
    items: Items[];
    user_email: string;
    given_name: string;
    family_name: string;
    item_name: string;
    item_category: string;
    item_quantity: number;
    item_price: number;
    item_owner: string;
    entry_id: number;
}

export interface Items {
    item_name: string;
    item_category: string;
    item_quantity: number;
    item_price: number;
    item_owner: string;
}

export interface NewSearch {
    start_date: string;
    end_date: string;
    user_email: string;
}

export interface PersonalData {
    age: number;
    gender: string;
    weight: number;
    weight_goal: number;
    period_weeks: number;
    height: number;
    diet: string;
    workout_per_wk: number;
    duration: number;
    user_email: string;
}

export interface ResponseData {
    reply: any;
}

export interface Summary {
    cash_total: string;
    paywave_total: string;
}

