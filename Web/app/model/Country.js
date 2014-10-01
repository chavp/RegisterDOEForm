Ext.define(AppConfig.appName + '.model.Country', {
    extend: 'Ext.data.Model',
    xtype: 'country',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'CountryTH', type: 'string' },
        { name: 'CountryEN', type: 'string' },
        { name: 'CountryAbv', type: 'string' }
    ]
});