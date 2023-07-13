import * as Joi from 'joi'
import { validData } from './validData';
    export const register = Joi.object().keys({
        admin_id: validData.alphaNum,
        password: validData.alphaNum,
      });

      export const findbyid = Joi.object().keys({
        a_id : validData.number
      })


