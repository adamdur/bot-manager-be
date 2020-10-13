import bookshelf from '../../../config/bookshelf';

let Inventory = bookshelf.Model.extend({
    tableName: 'inventory',
    hasTimestamps: true,
    purchase: function() {
        return this.hasOne(Purchase, 'inventory_item', 'id');
    },
    sale: function() {
        return this.hasOne(Sale, 'inventory_item', 'id');
    },
    rentals: function() {
        return this.hasMany(Rentals, 'inventory_item', 'id');
    },
    trade_in: function() {
        return this.hasOne(TradeIn, 'inventory_item', 'id');
    },
    trade_out: function() {
        return this.hasOne(TradeOut, 'inventory_item', 'id');
    },
});

let Purchase = bookshelf.Model.extend({
    tableName: 'bot_purchases',
    hasTimestamps: true,
    inventoryItem: function() {
        return this.belongsTo(Inventory);
    }
});

let Sale = bookshelf.Model.extend({
    tableName: 'bot_sales',
    hasTimestamps: true,
    inventoryItem: function() {
        return this.belongsTo(Inventory);
    }
});

let Rentals = bookshelf.Model.extend({
    tableName: 'bot_rentals',
    hasTimestamps: true,
    inventoryItem: function() {
        return this.belongsTo(Inventory);
    }
});

let TradeIn = bookshelf.Model.extend({
    tableName: 'bot_traded_in',
    hasTimestamps: true,
    inventoryItem: function() {
        return this.belongsTo(Inventory);
    }
});

let TradeOut = bookshelf.Model.extend({
    tableName: 'bot_traded_out',
    hasTimestamps: true,
    inventoryItem: function() {
        return this.belongsTo(Inventory);
    }
});

module.exports.Inventory = bookshelf.model('Inventory', Inventory);
