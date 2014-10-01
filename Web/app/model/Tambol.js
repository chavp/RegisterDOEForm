Ext.define(AppConfig.appName + '.model.Tambol', {
    extend: 'Ext.data.Model',
    xtype: 'tambol',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'ProvinceCode', type: 'string' },
        { name: 'AmphurCode', type: 'string' },
        { name: 'TamCode', type: 'string' },
        { name: 'TamName', type: 'string' }
    ]
});