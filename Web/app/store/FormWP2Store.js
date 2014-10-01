Ext.define(AppConfig.appName + '.store.FormWP2Store', {
    extend: 'Ext.data.Store',
    alias: 'widget.formwp2store',
    model: AppConfig.appName + '.model.FormWP2',
    pageSize: 300,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        extraParams: {
            emid: null,
            citizenID: null,
            aName: null,
            aMName: null,
            aSName: null,
            wpStatus: 'All'
        },
        api: {
            read: AppConfig.urlMainApi + '/FindFormWP2'
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
                    msg: 'เกิดข้อผิดพลาดในการค้นข้อมูล FormWP2 Store '
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