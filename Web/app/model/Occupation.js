Ext.define(AppConfig.appName + '.model.Occupation', {
    extend: 'Ext.data.Model',
    xtype: 'occupation',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'OccupationName', type: 'string' }
    ]
});