Ext.define(AppConfig.appName + '.model.Nationality', {
    extend: 'Ext.data.Model',
    xtype: 'nationality',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'NationTH', type: 'string' },
        { name: 'NationEN', type: 'string' },
        { name: 'NationCode', type: 'string' }
    ]
});