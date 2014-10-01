Ext.define(AppConfig.appName + '.model.BUCategory', {
    extend: 'Ext.data.Model',
    xtype: 'bucategory',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'BUCategoryCode', type: 'string' },
        { name: 'BUCategoryName', type: 'string' }
    ]
});