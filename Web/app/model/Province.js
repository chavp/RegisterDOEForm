Ext.define(AppConfig.appName + '.model.Province', {
    extend: 'Ext.data.Model',
    xtype: 'province',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'ProvinceCode', type: 'string' },
        { name: 'ProvinceName', type: 'string' }
    ]
});