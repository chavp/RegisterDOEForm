Ext.define(AppConfig.appName + '.model.Units', {
    extend: 'Ext.data.Model',
    xtype: 'units',
    idProperty: 'Code',
    fields: [
        { name: 'Code' },
        { name: 'Name', type: 'string' }
    ]
});