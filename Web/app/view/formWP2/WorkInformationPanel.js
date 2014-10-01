Ext.define(AppConfig.appName + '.view.formWP2.WorkInformationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'workinformationpanel',
    title: TextLabel.workInformation,
    layout: 'fit',
    bodyStyle: 'background-color: transparent !important;',
    config: {
        provinceStore: null,

        editData: null
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            itemId: 'mainForm',
            disabled: false,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            defaults: {
                defaultType: 'textfield',
                labelWidth: 100,
                allowBlank: true,
                labelAlign: 'right'
            },
            items: [
                {
                    itemId: 'chkNoWorkPermit',
                    fieldLabel: '<strong>2.1</strong>', xtype: 'checkbox',
                    boxLabel: '<strong>ไม่เคยมีใบอนุญาตทำงาน</strong>', labelSeparator: '',
                    labelWidth: 25,
                    margin: '5 0 5 0',
                    disabled: true,
                    listeners: {
                        change: function (box, newValue, oldValue, eOpts) {
                            var form = box.up('panel');
                            var chkNoWorkPermit = form.getComponent('chkNoWorkPermit');
                            var fieldcontainer_2_1_1 = form.getComponent('fieldcontainer_2_1_1');
                            var chkHadBeenWorkPermit = fieldcontainer_2_1_1.getComponent('chkHadBeenWorkPermit');
                            if (newValue) {
                                chkHadBeenWorkPermit.setValue(false);
                            }
                        }
                    }
                },
                {
                    itemId: 'fieldcontainer_2_1_1',
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelSeparator: '',
                    defaultType: 'checkbox',
                    labelWidth: 20,
                    defaults: {
                        labelWidth: 80,
                        allowBlank: true,
                        labelAlign: 'right'
                    },
                    items: [
                        {
                            itemId: 'chkHadBeenWorkPermit',
                            xtype: 'checkbox',
                            boxLabel: '<strong>เคยมีใบอนุญาตทำงาน</strong>', margin: '0 15 0 30',
                            disabled: true,
                            listeners: {
                                change: function (box, newValue, oldValue, eOpts) {
                                    var fieldcontainer_2_1_1 = box.up('fieldcontainer');
                                    var txtWPIDST = fieldcontainer_2_1_1.getComponent('txtWPIDST');
                                    var cmbBookIssueProvST = fieldcontainer_2_1_1.getComponent('cmbBookIssueProvST');
                                    var form = box.up('fieldcontainer').up('panel');
                                    var chkNoWorkPermit = form.getComponent('chkNoWorkPermit');

                                    txtWPIDST.setDisabled(true);
                                    cmbBookIssueProvST.setDisabled(true);
                                    txtWPIDST.reset();
                                    cmbBookIssueProvST.reset();

                                    if (newValue) {
                                        txtWPIDST.setDisabled(false);
                                        cmbBookIssueProvST.setDisabled(false);
                                        chkNoWorkPermit.setValue(false);
                                    }
                                }
                            }
                        },
                        {
                            itemId: 'txtWPIDST',
                            xtype: 'textfield',
                            fieldLabel: 'เลขที่', labelWidth: 50,
                            width: 250, margin: '10 0 0 0',
                            disabled: true,
                            maxLength: 50
                        },
                        {
                            itemId: 'cmbBookIssueProvST',
                            xtype: 'combo',
                            fieldLabel: 'ออกให้ที่ (จังหวัด)',
                            labelWidth: 130, width: 355, margin: '10 0 0 0',
                            queryMode: 'local',
                            forceSelection: true,
                            displayField: 'ProvinceName',
                            valueField: 'ProvinceCode',
                            store: me.provinceStore,
                            disabled: true
                        }
                    ]
                },
                {
                    itemId: 'fieldcontainer_2_2_1',
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelSeparator: '',
                    defaultType: 'checkbox',
                    labelWidth: 20,
                    defaults: {
                        labelWidth: 80,
                        allowBlank: true,
                        labelAlign: 'right'
                    },
                    items: [
                        {
                            itemId: 'chkPresentWorkPermitNO',
                            fieldLabel: '<strong>2.2</strong>',
                            xtype: 'checkbox',
                            boxLabel: '<strong>ใบอนุญาตทำงานปัจจุบัน</strong>', labelSeparator: '',
                            labelWidth: 25,
                            value: true,
                            readOnly: true,
                            listeners: {
                                change: function (box, newValue, oldValue, eOpts) {
                                    var fieldcontainer_2_2_1 = box.up('fieldcontainer');
                                    var txtWPIDND = fieldcontainer_2_2_1.getComponent('txtWPIDND');
                                    var dtBookIssueDateND = fieldcontainer_2_2_1.getComponent('dtBookIssueDateND');
                                    var fieldcontainer_2_2_2 = fieldcontainer_2_2_1.up('panel').getComponent('fieldcontainer_2_2_2');
                                    var cmbBookIssueProvND = fieldcontainer_2_2_2.getComponent('cmbBookIssueProvND');
                                    var dtBookExpireDateND = fieldcontainer_2_2_2.getComponent('dtBookExpireDateND');

                                    txtWPIDND.setDisabled(true);
                                    dtBookIssueDateND.setDisabled(true);
                                    cmbBookIssueProvND.setDisabled(true);
                                    dtBookExpireDateND.setDisabled(true);
                                    txtWPIDND.reset();
                                    dtBookIssueDateND.reset();
                                    cmbBookIssueProvND.reset();
                                    dtBookExpireDateND.reset();

                                    if (newValue) {
                                        txtWPIDND.setDisabled(false);
                                        dtBookIssueDateND.setDisabled(false);
                                        cmbBookIssueProvND.setDisabled(false);
                                        dtBookExpireDateND.setDisabled(false);
                                    }
                                }
                            }
                        },
                        {
                            itemId: 'txtWPIDND',
                            xtype: 'textfield', fieldLabel: 'เลขที่',
                            labelWidth: 50, width: 250, margin: '10 0 0 0',
                            readOnly: true,
                            fieldCls: 'readonly'
                        },
                        {
                            itemId: 'dtBookIssueDateND',
                            xtype: 'datefield', fieldLabel: 'ออกให้วันที่ (ค.ศ.)',
                            margin: '10 0 0 51',
                            disabled: false,
                            format: "d/m/Y",
                            fieldCls: 'required-text',
                            labelWidth: 120,
                            listeners: {
                                select: function (field, value, eOpts) {
                                    var mainForm = field.up('fieldcontainer').up('panel');
                                    var fieldcontainer_2_2_2 = mainForm.getComponent('fieldcontainer_2_2_2');
                                    var dtBookExpireDateND = fieldcontainer_2_2_2.getComponent('dtBookExpireDateND');
                                    dtBookExpireDateND.setMinValue(value);
                                }
                            }
                        }
                    ]
                },
                {
                    itemId: 'fieldcontainer_2_2_2',
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelSeparator: '',
                    labelWidth: 20,
                    defaults: {
                        labelWidth: 80,
                        allowBlank: true,
                        labelAlign: 'right',
                        disabled: false
                    },
                    items: [
                        {
                            itemId: 'cmbBookIssueProvND',
                            xtype: 'combo', fieldLabel: 'ออกให้ที่ (จังหวัด)',
                            labelWidth: 235,
                            width: 450,
                            queryMode: 'local',
                            forceSelection: true,
                            displayField: 'ProvinceName',
                            valueField: 'ProvinceCode',
                            store: me.provinceStore,
                            fieldCls: 'required-text'
                        },
                        {
                            itemId: 'dtBookExpireDateND',
                            xtype: 'datefield', fieldLabel: 'ใช้ได้ถึงวันที่ (ค.ศ.)',
                            margin: '0 0 0 37',
                            format: "d/m/Y",
                            fieldCls: 'required-text',
                            labelWidth: 120,
                            listeners: {
                                select: function (field, value, eOpts) {
                                    var mainForm = field.up('fieldcontainer').up('panel');
                                    var fieldcontainer_2_2_1 = mainForm.getComponent('fieldcontainer_2_2_1');
                                    var dtBookIssueDateND = fieldcontainer_2_2_1.getComponent('dtBookIssueDateND');
                                    dtBookIssueDateND.setMaxValue(value);
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    getWIData: function () {
        var me = this;
        var mainForm = me;
        var chkNoWorkPermit = me.getComponent('chkNoWorkPermit');
        var wiFlag = null;
        
        if (chkNoWorkPermit.getValue()) {
            wiFlag = 'N';
        }
        var fieldcontainer_2_1_1 = mainForm.getComponent('fieldcontainer_2_1_1');
        var chkHadBeenWorkPermit = fieldcontainer_2_1_1.getComponent('chkHadBeenWorkPermit');
        var txtWPIDST = fieldcontainer_2_1_1.getComponent('txtWPIDST');
        var cmbBookIssueProvST = fieldcontainer_2_1_1.getComponent('cmbBookIssueProvST');
        var wPIDST = null;
        var bookIssueProvST = null;
        if (chkHadBeenWorkPermit.getValue()) {
            wiFlag = 'Y';
            wPIDST = txtWPIDST.getValue();
            bookIssueProvST = cmbBookIssueProvST.getValue();
        }

        var fieldcontainer_2_2_1 = mainForm.getComponent('fieldcontainer_2_2_1');
        var chkPresentWorkPermitNO = fieldcontainer_2_2_1.getComponent('chkPresentWorkPermitNO');
        var txtWPIDND = fieldcontainer_2_2_1.getComponent('txtWPIDND');
        var dtBookIssueDateND = fieldcontainer_2_2_1.getComponent('dtBookIssueDateND');
        var fieldcontainer_2_2_2 = mainForm.getComponent('fieldcontainer_2_2_2');
        var cmbBookIssueProvND = fieldcontainer_2_2_2.getComponent('cmbBookIssueProvND');
        var dtBookExpireDateND = fieldcontainer_2_2_2.getComponent('dtBookExpireDateND');
        var bookFlag = null;
        var wPIDND = null;
        var bookIssueDateND = null;
        var bookIssueProvND = null;
        var bookExpireDateND = null;
        if (chkPresentWorkPermitNO.getValue()) {
            bookFlag = 'Y';
            wPIDND = txtWPIDND.getValue();
            bookIssueDateND = dtBookIssueDateND.getValue();
            bookIssueProvND = cmbBookIssueProvND.getValue();
            bookExpireDateND = dtBookExpireDateND.getValue();
        }

        return {
            // 2.1 
            WIFlag: wiFlag,
            WPIDST: wPIDST,
            BookIssueProvST: bookIssueProvST,
            // 2.2 
            BookFlag: bookFlag,
            WPIDND: wPIDND,
            BookIssueDateND: bookIssueDateND,
            BookIssueProvND: bookIssueProvND,
            BookExpireDateND: bookExpireDateND
        };

    },

    setValue: function (data) {
        var me = this;

        var fieldcontainer_2_1_1 = me.getComponent('fieldcontainer_2_1_1');
        var chkNoWorkPermit = me.getComponent('chkNoWorkPermit');
        //console.log(data);
        if (data.WIFlag === 'N') {
            chkNoWorkPermit.setValue(true);
        } else if (data.WIFlag === 'Y') {
            var chkHadBeenWorkPermit = fieldcontainer_2_1_1.getComponent('chkHadBeenWorkPermit');
            chkHadBeenWorkPermit.setValue(true);

            var txtWPIDST = fieldcontainer_2_1_1.getComponent('txtWPIDST');
            var cmbBookIssueProvST = fieldcontainer_2_1_1.getComponent('cmbBookIssueProvST');

            txtWPIDST.setValue(data.WPIDST);
            cmbBookIssueProvST.setValue(data.BookIssueProvST);
        }

        var fieldcontainer_2_2_1 = me.getComponent('fieldcontainer_2_2_1');
        var chkPresentWorkPermitNO = fieldcontainer_2_2_1.getComponent('chkPresentWorkPermitNO');
        var txtWPIDND = fieldcontainer_2_2_1.getComponent('txtWPIDND');
        var dtBookIssueDateND = fieldcontainer_2_2_1.getComponent('dtBookIssueDateND');
        var fieldcontainer_2_2_2 = me.getComponent('fieldcontainer_2_2_2');
        var cmbBookIssueProvND = fieldcontainer_2_2_2.getComponent('cmbBookIssueProvND');
        var dtBookExpireDateND = fieldcontainer_2_2_2.getComponent('dtBookExpireDateND');
        if (data.BookFlag === 'Y') {
            //console.log(data.BookFlag);
            chkPresentWorkPermitNO.setValue(true);
            //console.log(chkPresentWorkPermitNO);
            txtWPIDND.setValue(data.WPIDND);
            dtBookIssueDateND.setValue(data.BookIssueDateND);
            if (data.BookIssueDateND) {
                dtBookExpireDateND.setMinValue(data.BookIssueDateND);
            }
            
            cmbBookIssueProvND.setValue(data.BookIssueProvND);
            dtBookExpireDateND.setValue(data.BookExpireDateND);
            if (data.BookExpireDateND) {
                dtBookIssueDateND.setMaxValue(data.BookExpireDateND);
            }
        }
    },

    setWPIDND: function (data) {
        var me = this;

        var fieldcontainer_2_2_1 = me.getComponent('fieldcontainer_2_2_1');
        var txtWPIDND = fieldcontainer_2_2_1.getComponent('txtWPIDND');
        txtWPIDND.setValue(data);
    }
});