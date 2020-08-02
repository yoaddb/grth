import {Ticket} from '@ans-exam/client/src/api';

import * as fs from 'fs';
import Chance from 'chance';

const data = require('./data.json');
const privateData = require('./innerdata.json');

export const tempData = data as Ticket[];
export const temppPrivateData = privateData as Ticket[];

