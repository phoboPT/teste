const Mutations = {
    async createSupplier(parent, args, ctx, info) {
        const supplier = await ctx.db.mutation.createSupplier({
            data: {
                ...args,
            }
        }, info);        
        return supplier;

    }, async createProduct(parent, args, ctx, info) {    
        const item = { ...args };
        delete item.supplier;
        const newItem = await ctx.db.mutation.createProduct(
            {
                data: {
                    // This is how to create a relationship between the Item and the User
                    supplier: {
                        connect: {
                            id:args.supplier,
                        },
                    },
                    ...item,
                },
            },
            info
        );
        return newItem;
    },
    updateProduct(parent, args, ctx, info) {
        const updates = { ...args };
        delete updates.id;
        return ctx.db.mutation.updateProduct({
            data: updates,
            where: { id: args.id },
        },info);
    },
    updateSupplier(parent, args, ctx, info) {
        const updates = { ...args };
        delete updates.id;
        return ctx.db.mutation.updateSupplier({
            data: updates,
            where: { id: args.id },
        }, info);
    },
};

module.exports = Mutations;
