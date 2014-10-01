Ext.define(AppConfig.appName + '.model.PreRegisterSurvey', {
    extend: 'Ext.data.Model',
    xtype: 'preregistersurvey',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq' },
        { name: 'WPPreRegisterSeq' },
        { name: 'UnitsCode' },
        { name: 'NameContract', type: 'string' },
        { name: 'Tel', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        api: {
            create: AppConfig.urlMainApi + '/SavePreRegisterSurvey'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        listeners: {
            exception: function (proxy, response, operation) {
                var json = Ext.decode(response.responseText);
                if (json) {
                    Ext.MessageBox.show({
                        title: 'เกิดข้อผิดพลาดจากการดำเนินการ',
                        msg: json.message,
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        }
    }
});