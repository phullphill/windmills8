
import { Enum, CircularEnum } from './enum';

export const COMPASS = new CircularEnum('NORTH', 'EAST', 'SOUTH', 'WEST');
export const QUARTER = new CircularEnum('NORTHWEST', 'NORTHEAST', 'SOUTHEAST', 'SOUTHWEST');
export const MILLSPIN = new Enum('CLOCKWISE', 'COUNTERCLOCKWISE', 'NOSPIN');
export const FIELD_CONTENT = new Enum('MEADOW', 'WHEAT');
