// src/modules/controllers/controller.executor.ts
import mongoose from "mongoose";
import { parseTemplate } from "../../common/utils/templateParser";

export const executeController = async (controller: any, req: any) => {
    const db = mongoose.connection.db;
    const collection = db!.collection(controller.collection);

    const query = parseTemplate(controller.query, req);

    switch (controller.operation) {
        case "find":
            return collection
                .find(query.filter || {}, {
                    projection: query.projection,
                })
                .limit(controller.options?.limit || 0)
                .toArray();

        case "findOne":
            return collection.findOne(query.filter || {}, {
                projection: query.projection,
            });

        case "insertOne":
            return collection.insertOne(query.document);

        case "updateOne":
            return collection.updateOne(query.filter, query.update);

        case "deleteOne":
            return collection.deleteOne(query.filter);

        case "aggregate":
            return collection.aggregate(query.pipeline).toArray();

        default:
            throw new Error("Unsupported operation");
    }
};