Ext.define(AppConfig.appName + '.model.TitleName', {
    extend: 'Ext.data.Model',
    xtype: 'titlename',
    idProperty: 'ID',
    fields: [
        { name: 'ID' },
        { name: 'Name', type: 'string' },
        { name: 'NameEN', type: 'string' }
    ]
});