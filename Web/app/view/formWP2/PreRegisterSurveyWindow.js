Ext.define(AppConfig.appName + '.view.formWP2.PreRegisterSurveyWindow', {
    extend: 'Ext.window.Window',
    xtype: 'preregistersurveywindow',
    title: TextLabel.preRegisterSurveyTitle,
    resizable: false,
    closable: false,
    width: 600,
    iconCls: 'add-icon',
    config: {
        wpPreRegisterSeq: null,
        formWP2: null
    },
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            frame: false,
            border: 0,
            bodyStyle: 'padding: 6px',
            items: [{
                itemId: 'cmbUnits',
                name: 'Units',
                xtype: 'combo',
                fieldLabel: 'ศูนย์บริการที่ทานจะไปดเนินการ <span class="required">*</span>',
                labelWidth: 213,
                labelAlign: 'right',
                store: 'UnitsStore',
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Code',
                editable: false,
                allowBlank: false,
                emptyText: TextLabel.requireSelectEmptyText
            },
            {
                itemId: 'fieldset_1',
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                title: 'ผู้ที่สามารถติดต่อได้กรณีพบปัญหา',
                defaultType: 'textfield',
                defaults: {
                    labelWidth: 200,
                    allowBlank: false,
                    labelAlign: 'right'
                },
                items: [
                    {
                        itemId: 'txtNameContract',
                        fieldLabel: 'ชื่อ - นามสกุล <span class="required">*</span>'
                    },
                    {
                        itemId: 'txtTel',
                        fieldLabel: 'เบอร์โทรศัพย์ <span class="required">*</span>'
                    }
                ]
            }],
            buttons: [
                {
                    text: 'บันทึก',
                    iconCls: 'save-icon',
                    handler: function (widget, event) {
                        event.stopEvent();
                        var form = me;
                        var cmbUnits = form.getComponent('cmbUnits');
                        var fieldset_1 = form.getComponent('fieldset_1');
                        var txtNameContract = fieldset_1.getComponent('txtNameContract');
                        var txtTel = fieldset_1.getComponent('txtTel');
                        if (!cmbUnits.isValid()) {
                            Ext.MessageBox.show({
                                title: TextLabel.validationTitle,
                                msg: 'กรุณาเลือกศูนย์บริการที่ทานจะไปดเนินการ',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                            cmbUnits.focus(false);
                            return false;
                        }
                        if (!txtNameContract.isValid()) {
                            Ext.MessageBox.show({
                                title: TextLabel.validationTitle,
                                msg: 'กรุณาระบุชื่อ - นามสกุล',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                            txtNameContract.focus(false);
                            return false;
                        }
                        if (!txtTel.isValid()) {
                            Ext.MessageBox.show({
                                title: TextLabel.validationTitle,
                                msg: 'กรุณาระบุเบอร์โทรศัพย์',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                            txtTel.focus(false);
                            return false;
                        }
                        var newPreRegisterSurvey = Ext.create('widget.preregistersurvey',
                            {
                                WPPreRegisterSeq: me.wpPreRegisterSeq,
                                UnitsCode: cmbUnits.getValue(),
                                NameContract: txtNameContract.getValue(),
                                Tel: txtTel.getValue()
                            });

                        Ext.MessageBox.wait("กำลังบันทึกข้อมูลแบบสอบถาม...", 'กรุณารอ');
                        newPreRegisterSurvey.save({
                            success: function (record, operation) {
                                Ext.MessageBox.hide();
                                var response = Ext.decode(operation._response.responseText);

                                //console.log(response.seq);
                                Ext.MessageBox.show({
                                    title: TextLabel.successTitle,
                                    msg: 'บันทึกข้อมูลแบบสอบถามเสร็จสมบูรณ์',
                                    //width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO,
                                    fn: function (btn) {
                                        me.close();
                                        me.formWP2.set('PreRegisterSurveySeq', response.seq);
                                        me.formWP2.saveWithSurvey();
                                    }
                                });
                            },
                            failure: function (record, operation) {
                                Ext.MessageBox.hide();
                                var response = Ext.decode(operation._response.responseText);
                                if (!response.success) {
                                    Ext.MessageBox.show({
                                        title: "เกิดข้อผิดพลาด",
                                        animateTarget: widget,
                                        msg: response.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            }
                        });
                    }
                }, {
                    text: 'ยกเลิก',
                    iconCls: 'close-icon',
                    handler: function (widget, event) {
                        event.stopEvent();
                        me.close();
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});