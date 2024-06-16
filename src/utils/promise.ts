
export const promisify = (fn: Function, ctx?: any, Target?: any) => {
    return (...args: any[]) => new Promise((resolve, reject) => {
        let exe = fn;

        if(ctx) {
            exe = fn.bind(ctx);
        }

        exe(...args, (err: any, doc?: any) => {
            if (err) {
                reject(err);
            }

            let klassDoc: any;
            if(Target) {
                const keys = Object.keys(doc);
                const values: any[] = Object.values(doc);

                klassDoc = new Target();

                keys.forEach((key, index) => {
                    klassDoc[key] = values[index];
                });
            }

            resolve(klassDoc ?? doc);
        });
    });
};
