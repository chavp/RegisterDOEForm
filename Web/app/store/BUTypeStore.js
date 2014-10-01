Ext.define(AppConfig.appName + '.store.BUTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.butypestore',
    model: AppConfig.appName + '.model.BUType',
    pageSize: 999999,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: AppConfig.urlMasterApi + '/ReadBUType'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json'
        }
    },
    listeners: {
        exception: function (proxy, response, options) {
            Ext.MessageBox.show({
                title: TextLabel.errorAlertTitle,
                msg: 'เกิดข้อผิดพลาดในการค้นข้อมูล BUType '
                    + response.status + ": "
                    + response.statusText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });

            //window.location.href = paramsView.urlIndexPage;
        }
    }
});