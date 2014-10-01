Ext.define(AppConfig.appName + '.store.TitleArrayStore', {
    extend: 'Ext.data.ArrayStore',
    xtype: 'titlearraystore',
    model: AppConfig.appName + '.model.TitleName',
    data: [
        Ext.create('widget.titlename', { ID: 1, Name: 'นาย', NameEN: 'Mr.' }),
        Ext.create('widget.titlename', { ID: 2, Name: 'นาง', NameEN: 'Mrs.' }),
        Ext.create('widget.titlename', { ID: 3, Name: 'นางสาว', NameEN: 'Miss' })
    ]
});