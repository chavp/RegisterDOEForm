﻿Ext.define(AppConfig.appName + '.store.VisatypeStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.visatypestore',
    model: AppConfig.appName + '.model.Visatype',
    pageSize: 999999,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: AppConfig.urlMasterApi + '/ReadVisatype'
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
                msg: 'เกิดข้อผิดพลาดในการค้นข้อมูล Visatype '
                    + response.status + ": "
                    + response.statusText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });

            //window.location.href = paramsView.urlIndexPage;
        }
    }
});