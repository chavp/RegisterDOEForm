Ext.define(AppConfig.appName + '.view.formWP2.WorkPlaceAddressPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'workplaceaddresspanel',
    config: {
        provinceStore: null,
        amphurStore: null,
        tambolStore: null
    },
    initComponent: function () {
        var me = this;

        me.provinceStore.clearFilter();
        me.amphurStore.clearFilter();
        me.tambolStore.clearFilter();

        me.amphurStore.filter('ProvinceCode', -1);
        me.tambolStore.filter('AmphurCode', -1);

        Ext.apply(me, {
            items: [
                    {
                        itemId: 'fieldcontainer_3_1_3',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 150,
                            allowBlank: true,
                            labelAlign: 'right',
                            margin: '5 5 0 0'
                        },
                        items: [
                            {
                                itemId: 'hiddenEWID',
                                xtype: 'hidden'
                            },
                            {
                                itemId: 'txtEWName',
                                xtype: 'textfield',
                                fieldLabel: 'ชื่อสถานประกอบการ', width: 610,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWLoc',
                                xtype: 'textfield',
                                fieldLabel: 'รหัสสถานที่', width: 210, labelWidth: 85,
                                readOnly: true,
                                fieldCls: 'readonly'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_3_1_4',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            labelWidth: 50,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        items: [
                            {
                                itemId: 'txtEWHouse',
                                fieldLabel: 'ที่อยู่ เลขที่', labelWidth: 70, width: 150,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWBuilding',
                                fieldLabel: 'อาคาร', width: 260,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWMoo',
                                fieldLabel: 'หมู่/ชุมชน', width: 200, labelWidth: 90,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWTrok',
                                fieldLabel: 'ตรอก', width: 205, labelWidth: 90,
                                readOnly: true,
                                fieldCls: 'readonly'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_3_1_5',
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
                                itemId: 'txtEWSoi',
                                fieldLabel: 'ซอย', width: 305,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWRoad',
                                fieldLabel: 'ถนน', width: 300, labelWidth: 80,
                                readOnly: true,
                                fieldCls: 'readonly'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_3_1_6',
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

                                itemId: 'txtEWProv',
                                xtype: 'textfield', fieldLabel: 'จังหวัด', width: 200,
                                readOnly: true,
                                fieldCls: 'readonly'

                                //, emptyText: 'กรุณาเลือก',
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
                                itemId: 'txtEWAmp',
                                xtype: 'textfield', fieldLabel: 'อำเภอ/เขต', width: 200,
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
                                itemId: 'txtEWTamb',
                                xtype: 'textfield', fieldLabel: 'ตำบล/แขวง', width: 200,
                                readOnly: true,
                                fieldCls: 'readonly'

                                //, queryMode: 'local',
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
                                itemId: 'txtEWPost',
                                xtype: 'textfield',
                                fieldLabel: 'รหัสไปรษณีย์', width: 200, labelWidth: 80,
                                readOnly: true,
                                fieldCls: 'readonly'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_3_1_7',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 200,
                        defaults: {
                            labelWidth: 70,
                            allowBlank: true,
                            labelAlign: 'right',
                            margin: '0 5 0 0'
                        },
                        items: [
                            {
                                itemId: 'txtEWTel',
                                xtype: 'textfield', fieldLabel: 'โทรศัพย์', width: 260,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWFax',
                                xtype: 'textfield', fieldLabel: 'โทรสาร', width: 260,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                itemId: 'txtEWMobile',
                                xtype: 'textfield', fieldLabel: 'มือถือ', width: 260,
                                readOnly: true,
                                fieldCls: 'readonly'
                            }
                        ]
                    }
            ]
        });

        me.callParent(arguments);
    },

    setValue: function (data) {
        var me = this;

        //console.log(data);
        var fieldcontainer_3_1_3 = me.getComponent('fieldcontainer_3_1_3');
        var hiddenEWID = fieldcontainer_3_1_3.getComponent('hiddenEWID');
        var txtEWName = fieldcontainer_3_1_3.getComponent('txtEWName');
        txtEWName.setValue(data.EWName);
        hiddenEWID.setValue(data.EWID);
        //console.log(data.EWID);

        var txtEWLoc = fieldcontainer_3_1_3.getComponent('txtEWLoc');
        txtEWLoc.setValue(data.EWLoc);

        var fieldcontainer_3_1_4 = me.getComponent('fieldcontainer_3_1_4');
        var txtEWHouse = fieldcontainer_3_1_4.getComponent('txtEWHouse');
        var txtEWBuilding = fieldcontainer_3_1_4.getComponent('txtEWBuilding');
        var txtEWMoo = fieldcontainer_3_1_4.getComponent('txtEWMoo');
        txtEWHouse.setValue(data.EWHouse);
        txtEWBuilding.setValue(data.EWBuilding);
        txtEWMoo.setValue(data.EWMoo);

        var fieldcontainer_3_1_5 = me.getComponent('fieldcontainer_3_1_5');
        var txtEWSoi = fieldcontainer_3_1_5.getComponent('txtEWSoi');
        var txtEWRoad = fieldcontainer_3_1_5.getComponent('txtEWRoad');
        txtEWSoi.setValue(data.EWSoi);
        txtEWRoad.setValue(data.EWRoad);

        var fieldcontainer_3_1_6 = me.getComponent('fieldcontainer_3_1_6');
        var txtEWProv = fieldcontainer_3_1_6.getComponent('txtEWProv');
        var txtEWAmp = fieldcontainer_3_1_6.getComponent('txtEWAmp');
        var txtEWTamb = fieldcontainer_3_1_6.getComponent('txtEWTamb');
        var txtEWPost = fieldcontainer_3_1_6.getComponent('txtEWPost');
        txtEWProv.setValue(data.EWProvName);
        txtEWAmp.setValue(data.EWAmpName);
        txtEWTamb.setValue(data.EWTambName);
        txtEWPost.setValue(data.EWPostName);

        var fieldcontainer_3_1_7 = me.getComponent('fieldcontainer_3_1_7');
        var txtEWTel = fieldcontainer_3_1_7.getComponent('txtEWTel');
        var txtEWFax = fieldcontainer_3_1_7.getComponent('txtEWFax');
        var txtEWMobile = fieldcontainer_3_1_7.getComponent('txtEWMobile');
        txtEWTel.setValue(data.EWTel);
        txtEWFax.setValue(data.EWFax);
        txtEWMobile.setValue(data.EWMobile);
    },

    getEW: function () {
        var me = this;

        var fieldcontainer_3_1_3 = me.getComponent('fieldcontainer_3_1_3');
        var hiddenEWID = fieldcontainer_3_1_3.getComponent('hiddenEWID');
        //console.log(hiddenEWID);
        return {
            EWID: hiddenEWID.getValue()
        };
    }
});