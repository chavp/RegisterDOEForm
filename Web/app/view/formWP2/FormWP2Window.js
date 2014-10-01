Ext.define(AppConfig.appName + '.view.formWP2.FormWP2Window', {
    extend: 'Ext.window.Window',
    xtype: 'formwp2window',
    title: TextLabel.formWp2Name,
    resizable: false,
    closable: false,
    width: 1000,
    height: 600,

    config: {
        provinceStore: null,
        amphurStore: null,
        tambolStore: null,

        alienProvinceStore: null,
        alienAmphurStore: null,
        alienTambolStore: null,

        appInfo1ProvinceStore: null,
        appInfo1AmphurStore: null,
        appInfo1TambolStore: null,

        workInfoProvinceStore: null,

        province1Store: null,
        amphur1Store: null,
        tambol1Store: null,

        province2Store: null,
        amphur2Store: null,
        tambol2Store: null,

        province3Store: null,
        amphur3Store: null,
        tambol3Store: null,

        province4Store: null,
        amphur4Store: null,
        tambol4Store: null,

        buCategoryStore: null,
        buTypeStore: null,

        formWP2Store: null,

        editData: null
    },

    initComponent: function () {
        var me = this;

        var workinformation = Ext.create('widget.workinformationpanel', {
            title: TextLabel.workInformation,
            provinceStore: me.workInfoProvinceStore,

            editData: me.editData
        });
        me.workinformation = workinformation;

        var alieninformation = Ext.create('widget.alieninformationpanel', {
            title: TextLabel.alienInformation,
            provinceStore: me.alienProvinceStore,
            amphurStore: me.alienAmphurStore,
            tambolStore: me.alienTambolStore,

            editData: me.editData,
            workInformationPanel: workinformation
        });
        me.alieninformation = alieninformation;


        var applicationinformation = Ext.create('widget.applicationinformationpanel', {
            title: TextLabel.applicationInformation,
            provinceStore: me.appInfo1ProvinceStore,
            amphurStore: me.appInfo1AmphurStore,
            tambolStore: me.appInfo1TambolStore,

            province1Store: me.province1Store,
            amphur1Store: me.amphur1Store,
            tambol1Store: me.tambol1Store,

            province2Store: me.province2Store,
            amphur2Store: me.amphur2Store,
            tambol2Store: me.tambol2Store,

            province3Store: me.province3Store,
            amphur3Store: me.amphur3Store,
            tambol3Store: me.tambol3Store,

            province4Store: me.province4Store,
            amphur4Store: me.amphur4Store,
            tambol4Store: me.tambol4Store,

            buCategoryStore: me.buCategoryStore,
            buTypeStore: me.buTypeStore,

            editData: me.editData
        });
        me.applicationinformation = applicationinformation;

        me.cmdPrintForm = Ext.create('widget.button', {
            text: 'พิมพ์',
            disabled: true,
            iconCls: 'print-icon',
            handler: function (widget, event) {
                event.stopEvent();
                //console.log(me.editData);
                var barcodeID = me.editData.BarcodeID;

                //Ext.MessageBox.wait("กำลังสร้างรายงาน แบบ ตท. ๒...", 'กรุณารอ');
                window.open(AppConfig.urlMainApi + '/PrintFormWP2?barcodeID=' + barcodeID, '_blank');
                //Ext.Ajax.request({
                //    url: AppConfig.urlMainApi + '/PrintFormWP2?barcodeID=' + barcodeID,
                //    timeout: 120000,
                //    success: function (xhr) {
                //        //alert('success!');
                //        Ext.MessageBox.hide();
                //        var response = Ext.decode(xhr.responseText);
                //        if (response.success) {
                //            Ext.MessageBox.show({
                //                title: TextLabel.successTitle,
                //                msg: TextLabel.printSucessText,
                //                //width: 300,
                //                buttons: Ext.MessageBox.OK,
                //                icon: Ext.MessageBox.INFO,
                //                fn: function (btn) {
                //                    window.open(response.exportUrl, '_blank');
                //                }
                //            });
                //        } else {
                //            Ext.MessageBox.show({
                //                title: TextLabel.errorAlertTitle,
                //                msg: response.message,
                //                //width: 300,
                //                buttons: Ext.MessageBox.OK,
                //                icon: Ext.MessageBox.ERROR
                //            });
                //        }

                //    },
                //    failure: function (xhr) {
                //        //alert('failed  !');
                //        Ext.MessageBox.hide();

                //        Ext.MessageBox.show({
                //            title: TextLabel.errorAlertTitle,
                //            msg: xhr.responseText,
                //            //width: 300,
                //            buttons: Ext.MessageBox.OK,
                //            icon: Ext.MessageBox.ERROR
                //        });
                //    }
                //});

            }
        });


        Ext.apply(me, {
            xtype: 'form',
            layout: 'fit',
            items: [{
                xtype: 'tabpanel',
                defaults: {
                    bodyStyle: "background-image:url(./Content/images/background.png) !important;"
                },
                cls: 'font-thsarabun',
                items: [
                    //{ title: 'หน้าหลัก', xtype: 'mainformwp2panel' },
                    alieninformation,
                    workinformation,
                    applicationinformation
                ]
            }],
            //buttonAlign: 'center',
            buttons: [
                me.cmdPrintForm,
                '->',
                {
                text: 'บันทึก',
                iconCls: 'save-icon',
                handler: function (widget, event) {
                    event.stopEvent();

                    var formWP2 = alieninformation.getAlienInformation();
                    if (formWP2) {
                        var workinformation = me.workinformation.getWIData();
                        // 2.1 ------------------------------------------
                        formWP2.set('WIFlag', workinformation.WIFlag);
                        formWP2.set('WPIDST', workinformation.WPIDST);
                        formWP2.set('BookIssueProvST', workinformation.BookIssueProvST);
                        // 2.2 ------------------------------------------
                        formWP2.set('BookFlag', workinformation.BookFlag);
                        formWP2.set('WPIDND', workinformation.WPIDND);
                        formWP2.set('BookIssueDateND', workinformation.BookIssueDateND);
                        formWP2.set('BookIssueProvND', workinformation.BookIssueProvND);
                        formWP2.set('BookExpireDateND', workinformation.BookExpireDateND);

                        var appInfo = me.applicationinformation.getAppInfoData();
                        formWP2.set('RGType', appInfo.RGType);
                        formWP2.set('RGWorkType', appInfo.RGWorkType);
                        formWP2.set('RGWorkDetail', appInfo.RGWorkDetail);
                        formWP2.set('OccupationSeq', appInfo.OccupationSeq);
                        formWP2.set('EMID', appInfo.EMID);
                        formWP2.set('EMIDVerNO', appInfo.EMIDVerNO);
                        formWP2.set('DistrictCode', appInfo.EWLoc);
                        formWP2.set('EWID', appInfo.EWID);
                        //console.log(formWP2);

                        formWP2.saveWithSurvey(widget, me);
                    }
                }
            }, {
                text: 'ปิด',
                iconCls: 'close-icon',
                handler: function (widget, event) {
                    event.stopEvent();
                    me.close();
                }
            }]
        });

        me.callParent(arguments);
    },

    setAlienInformation: function (data) {
        var me = this;
        me.alieninformation.setValue(data);
        me.workinformation.setValue(data);
        me.applicationinformation.setValue(data);
        me.setVersion(data.Version);
        me.cmdPrintForm.setDisabled(true);
        if (data.WPStatus === 'CMP') {
            me.cmdPrintForm.setDisabled(false);
        }
    },

    setVersion: function (ver) {
        var me = this;
        if (ver == 0) {
            me.title += ' [ Draft Version. ]';
        } else {
            me.title += ' [ Version.' + ver + ' ]';
        }
    },

    getWPPreRegister: function () {
        var me = this;


    }
});