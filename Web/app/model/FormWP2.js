Ext.define(AppConfig.appName + '.model.FormWP2', {
    extend: 'Ext.data.Model',
    xtype: 'formwp2',
    idProperty: 'Seq',
    fields: [
        { name: 'Seq', type: 'int' },
        { name: 'Version' },
        { name: 'PreRegisterSurveySeq', type: 'int' },
        { name: 'BarcodeID', type: 'string' },

        // 1. Alien's Information
        { name: 'AlienFullName', type: 'string' },
        { name: 'CitizenID', type: 'string' },
        { name: 'WPStatus', type: 'string' },

        { name: 'WPTName', type: 'string' },
        { name: 'WPTNameEN', type: 'string' },
        { name: 'WPName', type: 'string' },
        { name: 'WPNameEN', type: 'string' },
        { name: 'WPMName', type: 'string' },
        { name: 'WPMNameEN', type: 'string' },
        { name: 'WPSName', type: 'string' },
        { name: 'WPSNameEN', type: 'string' },
        { name: 'WPSex', type: 'string' },
        { name: 'WPNation', type: 'string' },
        { name: 'WPAge', type: 'string' },
        { name: 'WPBloodGp', type: 'string' },
        { name: 'WPBDateYear', type: 'string' },
        { name: 'WPBDateMonth', type: 'string' },
        { name: 'WPBDateDay', type: 'string' },
        { name: 'WPAddrAbd', type: 'string' },
        { name: 'WPCountryAbd', type: 'string' },
        { name: 'WPPCodeAbd', type: 'string' },
        { name: 'WPHouse', type: 'string' },
        { name: 'WPMoo', type: 'string' },
        { name: 'WPTrok', type: 'string' },
        { name: 'WPSoi', type: 'string' },
        { name: 'WPRoad', type: 'string' },
        { name: 'WPBuilding', type: 'string' },
        { name: 'WPProv', type: 'string' },
        { name: 'WPAmp', type: 'string' },
        { name: 'WPTamb', type: 'string' },
        { name: 'WPPost', type: 'string' },
        { name: 'WPTel', type: 'string' },
        { name: 'WPFax', type: 'string' },
        { name: 'WPMobile', type: 'string' },
        // 1.4 -----------------------------------------
        { name: 'WPPassportFlag', type: 'string' },
        { name: 'WPPassportNO', type: 'string' },
        { name: 'WPPassportIssueAT', type: 'string' },
        { name: 'WPPassportCountry', type: 'string' },
        { name: 'WPPassportIssueDate', type: 'date', dateFormat: 'MS' },
        { name: 'WPPassportExpireDate', type: 'date', dateFormat: 'MS' },
        // 1.5 ------------------------------------------
        { name: 'WPVisaType', type: 'string' },
        { name: 'WPVisaNO', type: 'string' },
        { name: 'WPVisaIssueAT', type: 'string' },
        { name: 'WPVisaIssueDate', type: 'date', dateFormat: 'MS' },
        { name: 'WPVisaExpireDate', type: 'date', dateFormat: 'MS' },
        { name: 'WPArrivalDate', type: 'date', dateFormat: 'MS' },
        { name: 'WPImmiCheckpoint', type: 'string' },
        { name: 'WPStayableDate', type: 'date', dateFormat: 'MS' },

        // 2.1 ------------------------------------------
        { name: 'WIFlag', type: 'string' },
        { name: 'WPIDST', type: 'string' },
        { name: 'BookIssueProvST', type: 'string' },
        // 2.2 ------------------------------------------
        { name: 'BookFlag', type: 'string' },
        { name: 'WPIDND', type: 'string' },
        { name: 'BookIssueDateND', type: 'date', dateFormat: 'MS' },
        { name: 'BookIssueProvND', type: 'string' },
        { name: 'BookExpireDateND', type: 'date', dateFormat: 'MS' },

        // 3.1 ------------------------------------------
        { name: 'RGType', type: 'string' },
        { name: 'RGWorkType', type: 'string' },
        { name: 'RGWorkDetail', type: 'string' },
        { name: 'OccupationSeq', type: 'string' },
        { name: 'EMID', type: 'string' },
        { name: 'EMFullName', type: 'string' },
        { name: 'EMIDVerNO', type: 'string' },
        { name: 'EWID', type: 'string' },
        { name: 'EWIDVerNO', type: 'string' },
        { name: 'EWID2', type: 'string' },
        { name: 'EWID2VerNO', type: 'string'  },
        { name: 'EWID3', type: 'string' },
        { name: 'EWID3VerNO', type: 'string' },
        { name: 'EWID4', type: 'string' },
        { name: 'EWID4VerNO', type: 'string' },

        // 3.1 EM WP Main
        { name: 'EWID', type: 'int' },
        { name: 'BUTypeCode', type: 'string' },
        { name: 'EWLoc', type: 'string' },
        { name: 'EWName', type: 'string' },
        { name: 'EWHouse', type: 'string' },
        { name: 'EWMoo', type: 'string' },
        { name: 'EWBuilding', type: 'string' },
        { name: 'EWSoi', type: 'string' },
        { name: 'EWRoad', type: 'string' },
        { name: 'EWVillage', type: 'string' },
        { name: 'EWTamb', type: 'string' },
        { name: 'EWTambName', type: 'string' },
        { name: 'EWAmp', type: 'string' },
        { name: 'EWAmpName', type: 'string' },
        { name: 'EWProv', type: 'string' },
        { name: 'EWProvName', type: 'string' },
        { name: 'EWPost', type: 'string' },
        { name: 'EWTel', type: 'string' },
        { name: 'EWFax', type: 'string' },
        { name: 'EWMobile', type: 'string' },
        { name: 'EWVersionNO', type: 'int' },
        { name: 'DistrictCode', type: 'string' },

        { name: 'EWID2', type: 'int' },
        { name: 'EWID2VersionNO', type: 'int' },
        { name: 'EWID3', type: 'int' },
        { name: 'EWID3VersionNO', type: 'int' },
        { name: 'EWID4', type: 'int' },
        { name: 'EWID4VersionNO', type: 'int' },
        { name: 'EWID5', type: 'int' },
        { name: 'EWID5VersionNO', type: 'int' },
        { name: 'EWID6', type: 'int' },
        { name: 'EWID6VersionNO', type: 'int' },
        { name: 'EWID7', type: 'int' },
        { name: 'EWID7VersionNO', type: 'int' },
        { name: 'EWID8', type: 'int' },
        { name: 'EWID8VersionNO', type: 'int' },
        { name: 'EWID9', type: 'int' },
        { name: 'EWID9VersionNO', type: 'int' }
    ],
    proxy: {
        type: 'rest',
        api: {
            create: AppConfig.urlMainApi + '/SaveFormWP2',
            update: AppConfig.urlMainApi + '/UpdateFormWP2',
            destroy: AppConfig.urlMainApi + '/DeleteFormWP2'
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
    },

    saveWithSurvey: function (widget, window) {
        var me = this;
        me.widget = me.widget || widget;
        me.window = me.window || window;

        Ext.MessageBox.wait("กำลังบันทึกข้อมูล...", 'กรุณารอ');
        me.save({
            success: function (record, operation) {
                Ext.MessageBox.hide();
                var response = Ext.decode(operation._response.responseText);
                if (response.survay) {
                    var surveyForm = Ext.create('widget.preregistersurveywindow', {
                        modal: true,
                        animateTarget: me.widget,
                        wpPreRegisterSeq: me.window.editData.Seq,
                        formWP2: me
                    });
                    surveyForm.show();
                } else {
                    Ext.MessageBox.show({
                        title: TextLabel.successTitle,
                        animateTarget: me.widget,
                        msg: 'บันทึกข้อมูลเสร็จสมบูรณ์',
                        //width: 300,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO,
                        fn: function (btn) {
                            if (me.window.editData) {
                                me.window.close();
                            } else {
                                me.window.alieninformation.reset();
                            }

                            me.window.formWP2Store.load();
                        }
                    });
                }
            },
            failure: function (record, operation) {
                Ext.MessageBox.hide();
                //console.log(operation);
                if (operation.exception) {
                    if (operation.error) {
                        Ext.MessageBox.show({
                            title: "เกิดข้อผิดพลาด " + operation.error.statusText,
                            animateTarget: widget,
                            msg: operation.error.response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                } else {
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
            }
        });
    }
});