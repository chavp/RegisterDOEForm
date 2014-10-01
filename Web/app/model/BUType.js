Ext.define(AppConfig.appName + '.model.BUType', {
    extend: 'Ext.data.Model',
    xtype: 'butype',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'BUTypeCode', type: 'string' },
        { name: 'BUTypeName', type: 'string' },
        { name: 'GroupFlag', type: 'string' },
        { name: 'BUCategoryCode', type: 'string' }
    ]
});