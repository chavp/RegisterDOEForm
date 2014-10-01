Ext.define(AppConfig.appName + '.model.Visatype', {
    extend: 'Ext.data.Model',
    xtype: 'visatype',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'Typevisa', type: 'string' },
        { name: 'TypevisaTH', type: 'string' },
        { name: 'TypevisaAbv', type: 'string' }
    ]
});