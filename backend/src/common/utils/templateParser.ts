// src/common/utils/templateParser.ts
export const parseTemplate = (obj: any, req: any): any => {
    if (typeof obj === "string") {
        return obj
            .replace("{{params.id}}", req.params.id || "")
            .replace("{{body.email}}", req.body.email || "")
            .replace("{{headers.authorization}}", req.headers.authorization || "");
    }

    if (Array.isArray(obj)) {
        return obj.map(item => parseTemplate(item, req));
    }

    if (typeof obj === "object" && obj !== null) {
        const result: any = {};
        for (const key in obj) {
            result[key] = parseTemplate(obj[key], req);
        }
        return result;
    }

    return obj;
};