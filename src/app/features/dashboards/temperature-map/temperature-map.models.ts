export interface TemperaturePacket {
    data: RegionData[];
}

export interface RegionData {
    _id:    number;
    values: Value[];
}

export interface Value {
    time_stamp: Date;
    state:      string;
    value:      number;
    user:       number;
    parameter:  number;
}