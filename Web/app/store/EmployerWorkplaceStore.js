Ext.define(AppConfig.appName + '.store.EmployerWorkplaceStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.employerworkplacestore',
    model: AppConfig.appName + '.model.EmployerWorkplace',
    pageSize: 999999,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        extraParams: {
            emid: null
        },
        api: {
            read: AppConfig.urlMasterApi + '/FindEmployerWorkplace'
        },
        timeout: 120000,
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        listeners: {
            exception: function (proxy, response, options) {
                Ext.MessageBox.show({
                    title: 'ERROR',
                    msg: 'เกิดข้อผิดพลาดในการค้นข้อมูล EmployerWorkplace Store '
                        + response.status + ": "
                        + response.statusText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });

                //window.location.href = paramsView.urlIndexPage;
            }
        }
    }
});