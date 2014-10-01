Ext.define(AppConfig.appName + '.store.EmployerStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.employerstore',
    model: AppConfig.appName + '.model.Employer',
    pageSize: 999999,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        extraParams: {
            emName: null
        },
        api: {
            read: AppConfig.urlMasterApi + '/FindEmployer'
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
                    msg: 'เกิดข้อผิดพลาดในการค้นข้อมูล Employer Store '
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