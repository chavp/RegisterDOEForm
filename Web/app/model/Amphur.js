Ext.define(AppConfig.appName + '.model.Amphur', {
    extend: 'Ext.data.Model',
    xtype: 'amphur',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'ProvinceCode', type: 'string' },
        { name: 'AmphurCode', type: 'string' },
        { name: 'AmphurName', type: 'string' }
    ]
});