Ext.define(AppConfig.appName + '.view.formWP2.MainFormWP2Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainformwp2panel',
    title: 'หน้าหลัก',
    resizable: false,
    closable: false,
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            title: 'หน้าหลัก',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                border: false
            },
            items: [{
                xtype: 'panel',
                width: 1000,
                height: 200,
                layout: 'border',
                bodyStyle: "background-image:url(./Content/images/logo.png);background-repeat: no-repeat; !important; background-color: transparent !important;"
            },
            {
                xtype: 'panel',
                margin: '10 0 0 0',
                height: 500,
                bodyStyle: 'background-color: transparent !important;',
                items: [{
                    border: false,
                    defaults: {
                        margin: '10 0 0 0',
                        cls: 'font-thsarabun'
                    },
                    defaultType: 'checkbox',
                    bodyStyle: 'background-color: transparent !important;',
                    items: [{
                        boxLabel: 'คำขอรับใบอนุญาตทำงาน ตามมาตรา ๙',
                        value: true,
                        readOnly: true
                    }, {
                        boxLabel: 'คำขอรับใบอนุญาตทำงานแทนคนต่างด้าว ตามมาตรา ๑๑',
                        disabled: true
                    }, {
                        boxLabel: 'คำขอต่ออายุใบอนุญาตทำงาน ตามมาตรา ๒๓',
                        disabled: true
                    }, {
                        boxLabel: 'คำขอใบแทนใบอนุญาตทำงาน ตามมาตรา ๒๕',
                        disabled: true
                    }, {
                        boxLabel: 'คำขอเปลี่ยนหรือเพิ่มประเภทหรือลักษณะงาน ตามมาตรา ๒๖',
                        disabled: true
                    }, {
                        boxLabel: 'คำขอเปลี่ยนหรือเพิ่มนายจ้าง ตามมาตรา ๒๖',
                        disabled: true
                    }, {
                        boxLabel: 'คำขอเปลี่ยนหรือเพิ่มท้องที่หรือสถานที่ทำงาน ตามมาตรา ๒๖',
                        disabled: true
                    }, {
                        boxLabel: 'คำขอเปลี่ยนหรือเพิ่มเงื่อนไข ตามมาตรา ๒๖',
                        disabled: true
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});