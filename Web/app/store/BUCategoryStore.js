Ext.define(AppConfig.appName + '.store.BUCategoryStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.bucategorystore',
    model: AppConfig.appName + '.model.BUCategory',
    pageSize: 999999,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: AppConfig.urlMasterApi + '/ReadBUCategory'
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
                msg: 'เกิดข้อผิดพลาดในการค้นข้อมูล BUCategory '
                    + response.status + ": "
                    + response.statusText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });

            //window.location.href = paramsView.urlIndexPage;
        }
    }
});