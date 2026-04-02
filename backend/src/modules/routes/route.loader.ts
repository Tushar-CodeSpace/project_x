// src/modules/routes/route.loader.ts
import Route from "./route.model";
import Controller from "../controllers/controller.model";
import { executeController } from "../controllers/controller.executor";
import { getConfig } from "../config/config.service";
import type { Express, Request, Response } from "express";
import logger from "../../config/logger";
import { handlers } from "./handlers"; // ✅ ADD THIS

const allowedMethods = ["get", "post", "put", "delete", "patch"];

export const loadRoutes = async (app: Express) => {
    const configRoutes = getConfig("routes");

    if (!configRoutes || !Array.isArray(configRoutes)) {
        logger.warn("No valid routes config found");
        return;
    }

    const routeIds = [...new Set(configRoutes.map((r: any) => r.route_id))];

    const routes = await Route.find({ _id: { $in: routeIds } }).lean();

    if (!routes.length) {
        logger.warn("No routes found in DB");
        return;
    }

    const routeMap = routes.reduce((acc: any, r: any) => {
        acc[r._id] = r;
        return acc;
    }, {});

    const orderedRoutes = routeIds.map(id => routeMap[id]).filter(Boolean);

    const controllerIds = [
        ...new Set(orderedRoutes.map((r: any) => r.controller_id)),
    ];

    const controllers = await Controller.find({
        _id: { $in: controllerIds },
    }).lean();

    const controllerMap = controllers.reduce((acc: any, c: any) => {
        acc[c._id] = c;
        return acc;
    }, {});

    // 🚀 bind routes
    for (const route of orderedRoutes) {
        const method = route.method?.toLowerCase();

        if (!allowedMethods.includes(method)) {
            logger.warn(`Invalid method: ${route.method} (${route._id})`);
            continue;
        }

        const controller = controllerMap[route.controller_id];

        if (!controller) {
            logger.warn(`Controller not found: ${route.controller_id}`);
            continue;
        }

        let handler;

        // 🔥 SUPPORT CUSTOM HANDLERS
        if (controller.type === "custom") {
            handler = handlers[controller.handler];

            if (!handler) {
                logger.warn(`Handler not found: ${controller.handler}`);
                continue;
            }
        } else {
            // 🔥 DB EXECUTION FLOW
            handler = async (req: Request, res: Response) => {
                try {
                    const result = await executeController(controller, req);

                    res.json({
                        success: true,
                        data: result,
                    });
                } catch (err: any) {
                    logger.error(err, `Error in route ${route._id}`);

                    res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                    });
                }
            };
        }

        (app as any)[method](route.path, handler);

        logger.info(`Route loaded: [${route.method}] ${route.path}`);
    }
};