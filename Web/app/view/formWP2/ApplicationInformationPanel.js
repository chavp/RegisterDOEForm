Ext.define(AppConfig.appName + '.view.formWP2.ApplicationInformationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationinformationpanel',
    title: TextLabel.applicationInformation,
    resizable: false,
    closable: false,
    layout: 'fit',
    bodyStyle: 'background-color: transparent !important;',
    config: {
        provinceStore: null,
        amphurStore: null,
        tambolStore: null,

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

        province5Store: null,
        amphur5Store: null,
        tambol5Store: null,

        province6Store: null,
        amphur6Store: null,
        tambol6Store: null,

        province7Store: null,
        amphur7Store: null,
        tambol7Store: null,

        province8Store: null,
        amphur8Store: null,
        tambol8Store: null,

        buCategoryStore: null,
        buTypeStore: null,

        editData: null
    },
    initComponent: function () {
        var me = this;

        me.provinceStore.clearFilter();
        me.amphurStore.clearFilter();
        me.tambolStore.clearFilter();

        me.amphurStore.filter('ProvinceCode', -1);
        me.tambolStore.filter('AmphurCode', -1);

        me.buCategoryStore.clearFilter();
        me.buTypeStore.clearFilter();
        me.isSetValue = false;

        var occupationStore = Ext.create('widget.occupationstore');
        occupationStore.load();

        var employerStore = Ext.create('widget.employerstore');
        me.employerStore = employerStore;
        
        Ext.apply(me, {
            items: [{
                xtype: 'form',
                bodyStyle: 'background-color: transparent !important;',
                defaults: {
                    defaultType: 'textfield',
                    labelWidth: 100,
                    allowBlank: true,
                    labelAlign: 'right'
                },
                layout: 'border',
                items: [
                    {
                        itemId: 'mainform',
                        region: 'center',
                        xtype: 'form',
                        bodyStyle: 'background-color: transparent !important;',
                        autoScroll: true,
                        border: false,
                        margin: '0 0 0 5',
                        items: [{
                            itemId: 'fieldcontainer_3_1_1',
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            defaultType: 'combo',
                            labelWidth: 20,
                            fieldLabel: '<strong>3.1</strong>',
                            labelSeparator: '',
                            margin: '5 0 0 0',
                            hidden: true,
                            defaults: {
                                labelWidth: 200,
                                allowBlank: true,
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    itemId: 'chkApplyForAWorkPermit',
                                    xtype: 'checkbox',
                                    boxLabel: '<strong>(1) ขอรับใบอนุญาตทำงาน (Apply for work permit)</strong>',
                                    listeners: {
                                        change: function (box, newValue, oldValue, eOpts) {
                                            var fieldcontainer_3_1_1 = box.up('fieldcontainer');
                                            if (newValue) {
                                                var chkApplyForAWorkPermitOnBehalfOfAnAlien = fieldcontainer_3_1_1.getComponent('chkApplyForAWorkPermitOnBehalfOfAnAlien');
                                                chkApplyForAWorkPermitOnBehalfOfAnAlien.setValue(false);
                                            }
                                        }
                                    }
                                },
                                {
                                    itemId: 'chkApplyForAWorkPermitOnBehalfOfAnAlien',
                                    xtype: 'checkbox',
                                    boxLabel: '<strong>(2) ขอรับใบอนุญาตทำงานแทนคนต่างด้าว (Apply for a work permit on behalf of an alien)</strong>',
                                    listeners: {
                                        change: function (box, newValue, oldValue, eOpts) {
                                            var fieldcontainer_3_1_1 = box.up('fieldcontainer');
                                            if (newValue) {
                                                var chkApplyForAWorkPermit = fieldcontainer_3_1_1.getComponent('chkApplyForAWorkPermit');
                                                chkApplyForAWorkPermit.setValue(false);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            itemId: 'cmbRgWorkType',
                            xtype: 'combo',
                            fieldLabel: '<strong>3.1 ประเภทงานที่ขออนุญาต</strong>',
                            labelWidth: 185,
                            width: 500,
                            emptyText: 'กรุณาเลือก',
                            margin: '5 100 5 0',
                            queryMode: 'local',
                            forceSelection: true,
                            displayField: 'OccupationName',
                            valueField: 'Seq',
                            store: occupationStore,
                            labelAlign: 'right',
                            listeners: {
                                change: function (cmb, newValue, oldValue) {
                                    var from = cmb.up('form');
                                    var fieldworktype = from.getComponent('fieldcontainer_3_1_2');

                                    var cmbworktype1 = fieldworktype.getComponent('cmbworktype1');
                                    var cmbworktype2 = fieldworktype.getComponent('cmbworktype2');
                                    var txtworktype3 = fieldworktype.getComponent('txtworktype3');
                                    var txtworkposition = from.getComponent('txtworkposition');

                                    cmbworktype1.setDisabled(true);
                                    cmbworktype2.setDisabled(true);
                                    txtworktype3.setDisabled(true);

                                    cmbworktype1.reset();
                                    cmbworktype2.reset();
                                    var defaultType1 = cmb.getRawValue() + 'ในกิจการครัวเรือนส่วนบุคคล';
                                    if (!me.isSetValue) {
                                        txtworktype3.reset();
                                    }
                                    txtworkposition.reset();
                                    me.isSetValue = false;

                                    me.buTypeStore.filter('BUCategoryCode', -1);

                                    if (newValue == 2) { // ผู้รับใช้ในบ้าน
                                        cmbworktype1.setRawValue(cmb.getRawValue());
                                        txtworktype3.setValue(defaultType1);
                                        txtworkposition.setValue(cmb.getRawValue());
                                    } else if (newValue == 1) {  // กรรมกร
                                        cmbworktype1.setDisabled(false);
                                        cmbworktype2.setDisabled(false);
                                        txtworktype3.setDisabled(false);
                                        txtworkposition.setValue(cmb.getRawValue());

                                    } else {

                                    }
                                }
                            },
                            fieldCls: 'required-text'

                        },
                        {
                            itemId: 'fieldcontainer_3_1_2',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'combo',
                            labelWidth: 145,
                            fieldLabel: 'ลักษณะงาน',
                            margin: '5 5 5 40',
                            defaults: {
                                labelWidth: 80,
                                allowBlank: true,
                                labelAlign: 'right',
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    itemId: 'cmbworktype1',
                                    disabled: true,
                                    emptyText: 'กรุณาเลือก',
                                    width: 220,
                                    queryMode: 'local',
                                    forceSelection: false,
                                    displayField: 'BUCategoryName',
                                    valueField: 'BUCategoryCode',
                                    store: me.buCategoryStore,
                                    fieldCls: 'required-text',
                                    listeners: {
                                        change: function (cmb, newValue, oldValue) {
                                            var from = cmb.up('form');
                                            var fieldworktype = from.getComponent('fieldcontainer_3_1_2');
                                            var cmbworktype2 = fieldworktype.getComponent('cmbworktype2');
                                            cmbworktype2.reset();

                                            me.buTypeStore.clearFilter();
                                            me.buTypeStore.filter('BUCategoryCode', newValue);

                                            var txtworktype3 = fieldworktype.getComponent('txtworktype3');

                                            txtworktype3.setValue(cmb.getRawValue() + " " + cmbworktype2.getRawValue());
                                            
                                        }
                                    }
                                },
                                {
                                    itemId: 'cmbworktype2',
                                    disabled: true,
                                    emptyText: 'กรุณาเลือก',
                                    width: 220,
                                    queryMode: 'local',
                                    forceSelection: false,
                                    displayField: 'BUTypeName',
                                    valueField: 'BUTypeCode',
                                    store: me.buTypeStore,
                                    fieldCls: 'required-text',
                                    listeners: {
                                        change: function (cmb, newValue, oldValue) {
                                            var from = cmb.up('form');
                                            var fieldworktype = from.getComponent('fieldcontainer_3_1_2');
                                            var cmbworktype1 = fieldworktype.getComponent('cmbworktype1');

                                            var txtworktype3 = fieldworktype.getComponent('txtworktype3');

                                            txtworktype3.setValue(cmb.getRawValue());
                                            
                                        }
                                    }
                                },
                                {
                                    itemId: 'txtworktype3',
                                    xtype: 'textfield', disabled: true,
                                    width: 300,
                                    maxLength: 150,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        },
                        {
                            itemId: 'txtworkposition',
                            xtype: 'textfield',
                            fieldLabel: 'ตำแหน่งหน้าที่/อาชีพ/วิชาชีพ',
                            labelWidth: 180, margin: '5 5 0 5',
                            width: 530,
                            readOnly: true,
                            style: 'background-color: transparent; border-width: 0px; !important;',
                            fieldCls: 'readonly'
                        },
                        // -------------------------------------------------------------------------------
                        {
                            itemId: 'fieldcontainer_3_1_3',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'combo',
                            labelWidth: 200,
                            defaults: {
                                labelWidth: 180,
                                allowBlank: true,
                                //labelAlign: 'right',
                                margin: '5 5 5 5'
                            },
                            items: [
                                {
                                    itemId: 'hiddenEMVersionNO',
                                    xtype: 'hidden'
                                },
                                {
                                    itemId: 'cmbEmployer',
                                    fieldLabel: '<strong>ชื่อนายจ้าง/สถานประกอบการ</strong>',
                                    emptyText: 'กรุณาเลือก',
                                    labelSeparator: '',
                                    width: 800,
                                    queryMode: 'remote',
                                    forceSelection: true,
                                    displayField: 'Display',
                                    valueField: 'EMID',
                                    store: employerStore,
                                    pageSize: 50,
                                    allowBlank: true,
                                    triggerAction: 'all',
                                    minChars: 1,
                                    anyMatch: true,
                                    listeners: {
                                        select: function (combo, records, eOpts) {
                                            var employerID = combo.getValue();
                                            me.reloadEmployer(employerID);
                                        }
                                    },
                                    fieldCls: 'required-text'
                                }
                            ]
                        },
                        {
                            itemId: 'fieldcontainer_3_1_4',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 200,
                                allowBlank: true,
                                labelAlign: 'right',
                                margin: '0 5 5 0'
                            },
                            items: [
                                {
                                    itemId: 'txtPEMID',
                                    xtype: 'textfield',
                                    fieldLabel: 'เลขประจำตัว/เลขหนังสือเดินทาง', labelWidth: 200,
                                    width: 500,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtBEMID',
                                    xtype: 'textfield',
                                    fieldLabel: 'เลขนิติบุคคล', labelWidth: 110,
                                    width: 310,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        },
                        {
                            itemId: 'fieldcontainer_3_1_5',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'combo',
                            margin: '0 5 5 5',
                            defaults: {
                                labelWidth: 200,
                                allowBlank: true,
                                labelAlign: 'right',
                                margin: '0 5 5 0'
                            },
                            items: [
                                {
                                    itemId: 'txtEMTName',
                                    xtype: 'textfield',
                                    fieldLabel: 'คำนำหน้า', labelWidth: 100, width: 250,
                                    displayField: 'Name',
                                    valueField: 'ID',
                                    //store: 'TitleArrayStore',
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMName',
                                    xtype: 'textfield', width: 300,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMSName',
                                    xtype: 'textfield', fieldLabel: 'นามสกุล', width: 250, labelWidth: 50,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        },
                        {
                            itemId: 'fieldcontainer_3_1_6',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            labelWidth: 200,
                            defaults: {
                                labelWidth: 50,
                                allowBlank: true,
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    itemId: 'txtEMHouse', fieldLabel: 'ที่อยู่ เลขที่', labelWidth: 70, width: 150,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMBuilding', fieldLabel: 'อาคาร', width: 260,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMMoo', fieldLabel: 'หมู่/ชุมชน', width: 200, labelWidth: 80,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMTrok', fieldLabel: 'ตรอก', width: 205, labelWidth: 90,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        },
                        {
                            itemId: 'fieldcontainer_3_1_7',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            labelWidth: 200,
                            defaults: {
                                labelWidth: 70,
                                allowBlank: true,
                                labelAlign: 'right',
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    itemId: 'txtEMSoi', fieldLabel: 'ซอย', width: 300,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMRoad', fieldLabel: 'ถนน', width: 305, labelWidth: 80,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        },
                        {
                            itemId: 'fieldcontainer_3_1_8',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'combo',
                            labelWidth: 200,
                            defaults: {
                                labelWidth: 70,
                                allowBlank: true,
                                labelAlign: 'right',
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    itemId: 'hiddenEWLoc',
                                    xtype: 'hidden'
                                },
                                {
                                    itemId: 'txtEMProv',
                                    xtype: 'textfield',
                                    fieldLabel: 'จังหวัด', width: 200,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                    //,emptyText: 'กรุณาเลือก',
                                    //queryMode: 'local',
                                    //forceSelection: true,
                                    //displayField: 'ProvinceName',
                                    //valueField: 'ProvinceCode',
                                    //store: me.provinceStore,
                                    //listeners: {
                                    //    change: function (cmb, newValue, oldValue, eOpts) {
                                    //        me.amphurStore.clearFilter();
                                    //        me.amphurStore.filter('ProvinceCode', newValue);

                                    //        var cmbamphur = cmb.up('fieldcontainer').getComponent('cmbamphur');
                                    //        cmbamphur.reset();

                                    //        me.tambolStore.clearFilter();
                                    //        me.tambolStore.filter('ProvinceCode', -1);
                                    //        me.tambolStore.filter('AmphurCode', -1);
                                    //    }
                                    //}
                                },
                                {
                                    itemId: 'txtEMAmp',
                                    xtype: 'textfield',
                                    fieldLabel: 'อำเภอ/เขต', width: 200,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                    //,queryMode: 'local',
                                    //forceSelection: true,
                                    //displayField: 'AmphurName',
                                    //valueField: 'AmphurCode',
                                    //store: me.amphurStore, emptyText: 'กรุณาเลือก',
                                    //listeners: {
                                    //    change: function (cmb, newValue, oldValue, eOpts) {

                                    //        var cmbprovince = cmb.up('fieldcontainer').getComponent('cmbprovince');

                                    //        me.tambolStore.filter('ProvinceCode', cmbprovince.getValue());
                                    //        me.tambolStore.filter('AmphurCode', newValue);

                                    //        var cmbtambol = cmb.up('fieldcontainer').getComponent('cmbtambol');
                                    //        cmbtambol.reset();
                                    //    }
                                    //}
                                },
                                {
                                    itemId: 'txtEMTamb', fieldLabel: 'ตำบล/แขวง', width: 200, 
                                    readOnly: true,
                                    fieldCls: 'readonly'

                                    //,queryMode: 'local',
                                    //forceSelection: true,
                                    //displayField: 'TamName',
                                    //valueField: 'TamCode', emptyText: 'กรุณาเลือก',
                                    //store: me.tambolStore,
                                    //listeners: {
                                    //    change: function (cmb, newValue, oldValue, eOpts) {
                                    //        var txtpostcode = cmb.up('fieldcontainer').getComponent('txtpostcode');
                                    //        txtpostcode.reset();

                                    //        var cmbprovince = cmb.up('fieldcontainer').getComponent('cmbprovince');
                                    //        var cmbamphur = cmb.up('fieldcontainer').getComponent('cmbamphur');

                                    //        var provinceCode = cmbprovince.getValue(),
                                    //            amphurCode = cmbamphur.getValue();

                                    //        Ext.Ajax.request({
                                    //            url: AppConfig.urlMasterApi + '/GetPostCode'
                                    //                + '?tamCode=' + newValue
                                    //                + '&provinceCode=' + provinceCode
                                    //                + '&amphurCode=' + amphurCode,
                                    //            success: function (response) {
                                    //                var result = Ext.decode(response.responseText);
                                    //                txtpostcode.setValue(result.postCode);
                                    //            },
                                    //            failure: function (transport) {
                                    //                txtpostcode.reset();
                                    //            }
                                    //        });
                                    //    }
                                    //}
                                },
                                {
                                    itemId: 'txtEMPost', xtype: 'textfield', fieldLabel: 'รหัสไปรษณีย์', width: 200, labelWidth: 80,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        },
                        {
                            itemId: 'fieldcontainer_3_1_9',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'combo',
                            labelWidth: 200,
                            defaults: {
                                labelWidth: 70,
                                allowBlank: true,
                                labelAlign: 'right',
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    itemId: 'txtEMTel', xtype: 'textfield', fieldLabel: 'โทรศัพย์', width: 260,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMFax', xtype: 'textfield', fieldLabel: 'โทรสาร', width: 260,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                },
                                {
                                    itemId: 'txtEMMobile', xtype: 'textfield', fieldLabel: 'มือถือ', width: 260,
                                    readOnly: true,
                                    fieldCls: 'readonly'
                                }
                            ]
                        }]
                    },
                    {
                        itemId: 'workplaceaddress_panel',
                        title: 'สถานที่ทำงานของคนต่างด้าว',
                        xtype: 'tabpanel',
                        region: 'south',
                        layout: 'fit',
                        collapsed: true,
                        collapsible : true,
                        defaults: {
                            bodyStyle: "background-image:url(./Content/images/background.png) !important;"
                        },
                        items: [
                            {
                                itemId: 'workplaceaddress_1',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่หลัก',
                                provinceStore: me.province1Store,
                                amphurStore: me.amphur1Store,
                                tambolStore: me.tambol1Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_2',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 1',
                                provinceStore: me.province2Store,
                                amphurStore: me.amphur2Store,
                                tambolStore: me.tambol2Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_3',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 2',
                                provinceStore: me.province3Store,
                                amphurStore: me.amphur3Store,
                                tambolStore: me.tambol3Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_4',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 3',
                                provinceStore: me.province4Store,
                                amphurStore: me.amphur4Store,
                                tambolStore: me.tambol4Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_5',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 4',
                                provinceStore: me.province4Store,
                                amphurStore: me.amphur4Store,
                                tambolStore: me.tambol4Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_6',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 5',
                                provinceStore: me.province4Store,
                                amphurStore: me.amphur4Store,
                                tambolStore: me.tambol4Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_7',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 6',
                                provinceStore: me.province4Store,
                                amphurStore: me.amphur4Store,
                                tambolStore: me.tambol4Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_8',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 7',
                                provinceStore: me.province4Store,
                                amphurStore: me.amphur4Store,
                                tambolStore: me.tambol4Store,
                                disabled: true
                            },
                            {
                                itemId: 'workplaceaddress_9',
                                xtype: 'workplaceaddresspanel',
                                title: 'สถานที่ 8',
                                provinceStore: me.province4Store,
                                amphurStore: me.amphur4Store,
                                tambolStore: me.tambol4Store,
                                disabled: true
                            }
                        ]
                    }
                ]
            }]
        });

        me.callParent(arguments);
    },

    getAppInfoData: function () {
        var me = this;
        var mainform = me.down('form').getComponent('mainform');
        var fieldcontainer_3_1_1 = mainform.getComponent('fieldcontainer_3_1_1');
        var chkApplyForAWorkPermit = fieldcontainer_3_1_1.getComponent('chkApplyForAWorkPermit');
        var chkApplyForAWorkPermitOnBehalfOfAnAlien = fieldcontainer_3_1_1.getComponent('chkApplyForAWorkPermitOnBehalfOfAnAlien');

        var rgType = null;
        if (chkApplyForAWorkPermit.getValue()) {
            rgType = 'N';
        }
        else if (chkApplyForAWorkPermitOnBehalfOfAnAlien.getValue()) {
            rgType = 'R';
        }

        var cmbRgWorkType = mainform.getComponent('cmbRgWorkType');
        var fieldcontainer_3_1_2 = mainform.getComponent('fieldcontainer_3_1_2');
        var cmbworktype1 = fieldcontainer_3_1_2.getComponent('cmbworktype1');
        var cmbworktype2 = fieldcontainer_3_1_2.getComponent('cmbworktype2');
        var txtworktype3 = fieldcontainer_3_1_2.getComponent('txtworktype3');

        var rgWorkType = cmbRgWorkType.getValue();
        var rgWorkDetail = txtworktype3.getValue();
        var occupationSeq = cmbRgWorkType.getValue();

        var fieldcontainer_3_1_3 = mainform.getComponent('fieldcontainer_3_1_3');
        var hiddenEMVersionNO = fieldcontainer_3_1_3.getComponent('hiddenEMVersionNO');
        var cmbEmployer = fieldcontainer_3_1_3.getComponent('cmbEmployer');
        //hiddenEMVersionNO.setValue();

        var employerID = cmbEmployer.getValue();
        var employerVer = null;
        if (employerID) {
            employerVer = hiddenEMVersionNO.getValue();
        }

        var fieldcontainer_3_1_8 = mainform.getComponent('fieldcontainer_3_1_8');
        var hiddenEWLoc = fieldcontainer_3_1_8.getComponent('txtEMPost');

        var workplaceaddress_panel = me.down('form').getComponent('workplaceaddress_panel');
        var workplaceaddress_1 = workplaceaddress_panel.getComponent('workplaceaddress_1');
        var ewData = workplaceaddress_1.getEW();
        //console.log(ewData);

        return {
            RGType: rgType,
            RGWorkType: rgWorkType,
            RGWorkDetail: rgWorkDetail,
            OccupationSeq: occupationSeq,

            EMID: employerID,
            EMIDVerNO: employerVer,
            EWLoc: hiddenEWLoc.getValue(),
            EWID: ewData.EWID
        };
    },

    reloadEmployer: function (emid) {
        var me = this;
        me.setLoading(true);
        var citizenID = '';
        if (me.editData) {
            citicenID = me.editData.CitizenID;
        }

        me.employerStore.load();
        Ext.Ajax.request({
            url: AppConfig.urlMasterApi + '/GetEmployer?emid=' + emid,
            success: function (response) {
                me.setLoading(false);

                var data = Ext.decode(response.responseText);
                var employer = data.employer;

                var from = me.down('form').getComponent('mainform');
                var fieldcontainer_3_1_3 = from.getComponent('fieldcontainer_3_1_3');
                var hiddenEMVersionNO = fieldcontainer_3_1_3.getComponent('hiddenEMVersionNO');
                hiddenEMVersionNO.setValue(employer.EMVersionNO);
                var cmbEmployer = fieldcontainer_3_1_3.getComponent('cmbEmployer');

                cmbEmployer.setValue(employer.EMID);
                //console.log(employer.EMID);
                //cmbEmployee.setRawValue(employer.EMID + ': ' + employer.EMTName + ' ' + employer.EMSName);

                var fieldcontainer_3_1_4 = from.getComponent('fieldcontainer_3_1_4');
                var txtPEMID = fieldcontainer_3_1_4.getComponent('txtPEMID');
                var txtBEMID = fieldcontainer_3_1_4.getComponent('txtBEMID');
                txtPEMID.reset();
                txtBEMID.reset();
                if (employer.EMIDFlg === 'P') {
                    txtPEMID.setValue(employer.EMID);
                } else if (employer.EMIDFlg === 'B') {
                    txtBEMID.setValue(employer.EMID);
                }

                var fieldcontainer_3_1_5 = from.getComponent('fieldcontainer_3_1_5');
                var txtEMTName = fieldcontainer_3_1_5.getComponent('txtEMTName');
                var txtEMName = fieldcontainer_3_1_5.getComponent('txtEMName');
                var txtEMSName = fieldcontainer_3_1_5.getComponent('txtEMSName');
                txtEMTName.reset();
                txtEMName.reset();
                txtEMSName.reset();
                txtEMTName.setValue(employer.EMTName);
                txtEMName.setValue(employer.EMName);
                txtEMSName.setValue(employer.EMSName);

                var fieldcontainer_3_1_6 = from.getComponent('fieldcontainer_3_1_6');
                var txtEMHouse = fieldcontainer_3_1_6.getComponent('txtEMHouse');
                var txtEMMoo = fieldcontainer_3_1_6.getComponent('txtEMMoo');
                var txtEMBuilding = fieldcontainer_3_1_6.getComponent('txtEMBuilding');
                txtEMHouse.reset();
                txtEMMoo.reset();
                txtEMBuilding.reset();
                txtEMHouse.setValue(employer.EMHouse);
                txtEMMoo.setValue(employer.EMMoo);
                txtEMBuilding.setValue(employer.EMBuilding);

                var fieldcontainer_3_1_7 = from.getComponent('fieldcontainer_3_1_7');
                var txtEMSoi = fieldcontainer_3_1_7.getComponent('txtEMSoi');
                var txtEMRoad = fieldcontainer_3_1_7.getComponent('txtEMRoad');
                txtEMSoi.reset();
                txtEMRoad.reset();
                txtEMSoi.setValue(employer.EMSoi);
                txtEMRoad.setValue(employer.EMRoad);

                var fieldcontainer_3_1_8 = from.getComponent('fieldcontainer_3_1_8');
                var txtEMProv = fieldcontainer_3_1_8.getComponent('txtEMProv');
                var txtEMAmp = fieldcontainer_3_1_8.getComponent('txtEMAmp');
                var txtEMTamb = fieldcontainer_3_1_8.getComponent('txtEMTamb');
                var txtEMPost = fieldcontainer_3_1_8.getComponent('txtEMPost');
                var hiddenEWLoc = fieldcontainer_3_1_8.getComponent('txtEMPost');
                txtEMProv.reset();
                txtEMAmp.reset();
                txtEMTamb.reset();
                txtEMPost.reset();
                hiddenEWLoc.reset();
                txtEMProv.setValue(employer.EMProvName);
                txtEMAmp.setValue(employer.EMAmpName);
                txtEMTamb.setValue(employer.EMTambName);
                txtEMPost.setValue(employer.EMPost);
                hiddenEWLoc.setValue(employer.EWLoc);

                var fieldcontainer_3_1_9 = from.getComponent('fieldcontainer_3_1_9');
                var txtEMTel = fieldcontainer_3_1_9.getComponent('txtEMTel');
                var txtEMFax = fieldcontainer_3_1_9.getComponent('txtEMFax');
                var txtEMMobile = fieldcontainer_3_1_9.getComponent('txtEMMobile');
                txtEMTel.reset();
                txtEMFax.reset();
                txtEMMobile.reset();
                txtEMTel.setValue(employer.EMTel);
                txtEMFax.setValue(employer.EMFax);
                txtEMMobile.setValue(employer.EMMobile);

                me.reloadEmployerWorkplace(employer.EWID, 1);
                for (var i = 2; i <= 9; i++) {
                    me.reloadEmployerWorkplace(employer['EWID' + i], i);
                }

            },
            failure: function (transport) {
                me.setLoading(false);
            }
        });
    },

    reloadEmployerOnly: function (emid) {
        var me = this;
        me.setLoading(true);
        var citizenID = '';
        if (me.editData) {
            citicenID = me.editData.CitizenID;
        }

        me.employerStore.load();
        Ext.Ajax.request({
            url: AppConfig.urlMasterApi + '/GetEmployer?emid=' + emid,
            success: function (response) {
                me.setLoading(false);

                var data = Ext.decode(response.responseText);
                var employer = data.employer;

                var from = me.down('form').getComponent('mainform');
                var fieldcontainer_3_1_3 = from.getComponent('fieldcontainer_3_1_3');
                var hiddenEMVersionNO = fieldcontainer_3_1_3.getComponent('hiddenEMVersionNO');
                hiddenEMVersionNO.setValue(employer.EMVersionNO);
                var cmbEmployer = fieldcontainer_3_1_3.getComponent('cmbEmployer');

                cmbEmployer.setValue(employer.EMID);
                //console.log(employer.EMID);
                //cmbEmployee.setRawValue(employer.EMID + ': ' + employer.EMTName + ' ' + employer.EMSName);

                var fieldcontainer_3_1_4 = from.getComponent('fieldcontainer_3_1_4');
                var txtPEMID = fieldcontainer_3_1_4.getComponent('txtPEMID');
                var txtBEMID = fieldcontainer_3_1_4.getComponent('txtBEMID');
                txtPEMID.reset();
                txtBEMID.reset();
                if (employer.EMIDFlg === 'P') {
                    txtPEMID.setValue(employer.EMID);
                } else if (employer.EMIDFlg === 'B') {
                    txtBEMID.setValue(employer.EMID);
                }

                var fieldcontainer_3_1_5 = from.getComponent('fieldcontainer_3_1_5');
                var txtEMTName = fieldcontainer_3_1_5.getComponent('txtEMTName');
                var txtEMName = fieldcontainer_3_1_5.getComponent('txtEMName');
                var txtEMSName = fieldcontainer_3_1_5.getComponent('txtEMSName');
                txtEMTName.reset();
                txtEMName.reset();
                txtEMSName.reset();
                txtEMTName.setValue(employer.EMTName);
                txtEMName.setValue(employer.EMName);
                txtEMSName.setValue(employer.EMSName);

                var fieldcontainer_3_1_6 = from.getComponent('fieldcontainer_3_1_6');
                var txtEMHouse = fieldcontainer_3_1_6.getComponent('txtEMHouse');
                var txtEMMoo = fieldcontainer_3_1_6.getComponent('txtEMMoo');
                var txtEMBuilding = fieldcontainer_3_1_6.getComponent('txtEMBuilding');
                txtEMHouse.reset();
                txtEMMoo.reset();
                txtEMBuilding.reset();
                txtEMHouse.setValue(employer.EMHouse);
                txtEMMoo.setValue(employer.EMMoo);
                txtEMBuilding.setValue(employer.EMBuilding);

                var fieldcontainer_3_1_7 = from.getComponent('fieldcontainer_3_1_7');
                var txtEMSoi = fieldcontainer_3_1_7.getComponent('txtEMSoi');
                var txtEMRoad = fieldcontainer_3_1_7.getComponent('txtEMRoad');
                txtEMSoi.reset();
                txtEMRoad.reset();
                txtEMSoi.setValue(employer.EMSoi);
                txtEMRoad.setValue(employer.EMRoad);

                var fieldcontainer_3_1_8 = from.getComponent('fieldcontainer_3_1_8');
                var txtEMProv = fieldcontainer_3_1_8.getComponent('txtEMProv');
                var txtEMAmp = fieldcontainer_3_1_8.getComponent('txtEMAmp');
                var txtEMTamb = fieldcontainer_3_1_8.getComponent('txtEMTamb');
                var txtEMPost = fieldcontainer_3_1_8.getComponent('txtEMPost');
                var hiddenEWLoc = fieldcontainer_3_1_8.getComponent('txtEMPost');
                txtEMProv.reset();
                txtEMAmp.reset();
                txtEMTamb.reset();
                txtEMPost.reset();
                hiddenEWLoc.reset();
                txtEMProv.setValue(employer.EMProvName);
                txtEMAmp.setValue(employer.EMAmpName);
                txtEMTamb.setValue(employer.EMTambName);
                txtEMPost.setValue(employer.EMPost);
                hiddenEWLoc.setValue(employer.EWLoc);

                var fieldcontainer_3_1_9 = from.getComponent('fieldcontainer_3_1_9');
                var txtEMTel = fieldcontainer_3_1_9.getComponent('txtEMTel');
                var txtEMFax = fieldcontainer_3_1_9.getComponent('txtEMFax');
                var txtEMMobile = fieldcontainer_3_1_9.getComponent('txtEMMobile');
                txtEMTel.reset();
                txtEMFax.reset();
                txtEMMobile.reset();
                txtEMTel.setValue(employer.EMTel);
                txtEMFax.setValue(employer.EMFax);
                txtEMMobile.setValue(employer.EMMobile);
            },
            failure: function (transport) {
                me.setLoading(false);
            }
        });
    },

    reloadEmployerWorkplace: function (ewid, order) {
        var me = this;

        var workplaceaddress_panel = me.down('form').getComponent('workplaceaddress_panel');
        var workplaceaddress_1 = workplaceaddress_panel.getComponent('workplaceaddress_' + order);
        if (ewid != 0 && ewid) {
            me.setLoading(true);

            Ext.Ajax.request({
                url: AppConfig.urlMasterApi + '/GetEmployerWorkplace?ewid=' + ewid,
                success: function (response) {
                    me.setLoading(false);

                    var data = Ext.decode(response.responseText);
                    var employerWorkplace = data.employerWorkplace;

                    workplaceaddress_panel.expand();
                    workplaceaddress_1.setDisabled(false);
                    workplaceaddress_1.setValue({
                        EWID: employerWorkplace.EWID,
                        BUTypeCode: employerWorkplace.BUTypeCode,
                        EWLoc: employerWorkplace.EWLoc,
                        EWName: employerWorkplace.EWName,
                        EWHouse: employerWorkplace.EWHouse,
                        EWMoo: employerWorkplace.EWMoo,
                        EWBuilding: employerWorkplace.EWBuilding,
                        EWSoi: employerWorkplace.EWSoi,
                        EWRoad: employerWorkplace.EWRoad,
                        EWVillage: employerWorkplace.EWVillage,
                        EWTamb: employerWorkplace.EWTamb,
                        EWTambName: employerWorkplace.EWTambName,
                        EWAmp: employerWorkplace.EWAmp,
                        EWAmpName: employerWorkplace.EWAmpName,
                        EWProv: employerWorkplace.EWProv,
                        EWProvName: employerWorkplace.EWProvName,
                        EWPost: employerWorkplace.EWPost,
                        EWTel: employerWorkplace.EWTel,
                        EWFax: employerWorkplace.EWFax,
                        EWMobile: employerWorkplace.EWMobile,
                        EWVersionNO: employerWorkplace.EWVersionNO
                    });

                },
                failure: function (transport) {
                    me.setLoading(false);
                }
            });
        } else {
            workplaceaddress_1.setDisabled(true);
        }

        if (order == 1) {
            workplaceaddress_panel.setTabIndex(0);
        }
    },

    setValue: function (data) {
        var me = this;
        me.isSetValue = true;

        var mainform = me.down('form').getComponent('mainform');
        var fieldcontainer_3_1_1 = mainform.getComponent('fieldcontainer_3_1_1');
        var chkApplyForAWorkPermit = fieldcontainer_3_1_1.getComponent('chkApplyForAWorkPermit');
        var chkApplyForAWorkPermitOnBehalfOfAnAlien = fieldcontainer_3_1_1.getComponent('chkApplyForAWorkPermitOnBehalfOfAnAlien');

        var cmbRgWorkType = mainform.getComponent('cmbRgWorkType');
        var fieldcontainer_3_1_2 = mainform.getComponent('fieldcontainer_3_1_2');
        var cmbworktype1 = fieldcontainer_3_1_2.getComponent('cmbworktype1');
        var cmbworktype2 = fieldcontainer_3_1_2.getComponent('cmbworktype2');
        var txtworktype3 = fieldcontainer_3_1_2.getComponent('txtworktype3');
        var txtworkposition = mainform.getComponent('txtworkposition');

        if (data.RGType === 'N') {
            chkApplyForAWorkPermit.setValue(true);
        } else if (data.RGType === 'R') {
            chkApplyForAWorkPermitOnBehalfOfAnAlien.setValue(true);
        }

        if (data.RGWorkType) {
            cmbRgWorkType.setValue(parseInt(data.RGWorkType));
            txtworkposition.setValue(cmbRgWorkType.getRawValue());
        }
        
        txtworktype3.setValue(data.RGWorkDetail);

        var fieldcontainer_3_1_3 = mainform.getComponent('fieldcontainer_3_1_3');
        var hiddenEMVersionNO = fieldcontainer_3_1_3.getComponent('hiddenEMVersionNO');
        var cmbEmployer = fieldcontainer_3_1_3.getComponent('cmbEmployer');

        if (data.EMID) {
            me.reloadEmployerOnly(data.EMID);
        }

        me.reloadEmployerWorkplace(data.EWID, 1);
        for (var i = 2; i <= 9; i++) {
            me.reloadEmployerWorkplace(data['EWID' + i], i);
        }
    }

});