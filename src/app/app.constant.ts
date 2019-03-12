import { HouseDTO } from './house.interface';
// API urls
export const DATA_URL = `houseData/`;

// Pagination config
export const PAGINATOR_SIZE_ARRAY = [5, 10];

// Header config
export const HEADER_COLUMN_CLOSE_TO_SISTER: { key: string, value: string, cell: (row: HouseDTO)  => string|number }[] = [
    {
        key: 'distance',
        value: 'Distance in Kilometers',
        cell: (row) => `${row.distance}`
    },
    {
        key: 'street',
        value: 'Street Name',
        cell: (row) => `${row.street}`
    }
];

export const HEADER_COLUMN_ROOM_GT5: { key: string, value: string, cell: (row: HouseDTO)  => string|number }[] = [
    {
        key: 'street',
        value: 'Street Name',
        cell: (row) => `${row.street}`
    },
    {
        key: 'rooms',
        value: 'Rooms',
        cell: (row) => `${row.params.rooms}`
    }
];

export const HEADER_COLUMN_UNKNOWN_DATA: { key: string, value: string, cell: (row: HouseDTO)  => string|number }[] = [
    {
        key: 'street',
        value: 'Street Name',
        cell: (row) => `${row.street}`
    }
];
