import queryDb from "../db/mysql";
import Joi = require("joi");

interface IdInfo {
    id: number | undefined
}

export const dbGet = async (tableName: string, info: IdInfo): Promise<Object> => {
    if (info.id !== undefined) {
        try {
            const result = await queryDb("SELECT * FROM ? WHERE id=?", [tableName, info.id]);
            return result;
        } catch(err) {
            console.error(err);
            return {};
        }
    }
    else {
        try {
            const result = await queryDb("SELECT * FROM ?", tableName);
            return result;
        } catch(err) {
            console.error(err);
            return {};
        }
    }
};

export const dbPost = async (tableName: string, info: Object, schema: Joi.ObjectSchema<any>): Promise<void> => {
    try {
        await schema.validateAsync(info, {abortEarly: false});
    } catch (err) {
        console.error(err);
    }
    try {
        await queryDb("INSERT INTO ? SET ?", [tableName, info]);
    } catch (err) {
        console.error(err);
    }
};

export const dbPut = async (tableName: string, info: IdInfo, schema: Joi.ObjectSchema<any>): Promise<void> => {
    try {
        await schema.validateAsync(info, {abortEarly: false});
    } catch (err) {
        console.error(err);
    }
    try {
        await queryDb("UPDATE ? SET ? WHERE id=?", [tableName, info, info.id]);
    } catch (err) {
        console.error(err);
    }
}

export const dbDelete = async (tableName: string, info: IdInfo): Promise<void> => {
    if (info === undefined)
        return;
    try {
        await queryDb("DELETE FROM ? WHERE id=?", [tableName, info.id]);
    } catch (err) {
        console.error(err);
    }
}