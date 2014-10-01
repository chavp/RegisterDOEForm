Ext.define(AppConfig.appName + '.view.formWP2.AlienInformationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'alieninformationpanel',
    title: TextLabel.alienInformation,
    resizable: false,
    closable: false,
    layout: 'fit',
    bodyStyle: 'background-color: transparent !important;',
    config: {
        provinceStore: null,
        amphurStore: null,
        tambolStore: null,

        editData: null,
        workInformationPanel: null
    },
    initComponent: function () {
        var me = this;

        var now = new Date();
        var years = [];
        for (var i = now.getFullYear() - 100; i <= now.getFullYear() ; i++) {
            years.push([i, i]);
        }

        var months = [];
        for (var i = 0; i < 12 ; i++) {
            months.push([i, i + 1]);
        }

        var dayStore = new Ext.data.ArrayStore({
            fields: [
              { name: 'display', type: 'int' },
              { name: 'value', type: 'int' }
            ]
        });
        me.dayStore = dayStore;

        me.provinceStore.clearFilter();
        me.amphurStore.clearFilter();
        me.tambolStore.clearFilter();

        me.amphurStore.filter('ProvinceCode', -1);
        me.tambolStore.filter('AmphurCode', -1);

        var visatypeStore = Ext.create('widget.visatypestore');
        visatypeStore.load();

        var checkboxChangePassportToggle = function (box, newValue, oldValue, eOpts, chkPassport) {
            var fieldcontainer_1_1_11 = box.up('fieldcontainer')
                                                .up('form')
                                                .getComponent('fieldcontainer_1_1_11');
            var txtPassportNO = fieldcontainer_1_1_11.getComponent('txtPassportNO');
            var txtPassportIssueAT = fieldcontainer_1_1_11.getComponent('txtPassportIssueAT');
            var cmbPassportCountry = fieldcontainer_1_1_11.getComponent('cmbPassportCountry');
            txtPassportNO.setDisabled(true);
            txtPassportIssueAT.setDisabled(true);
            cmbPassportCountry.setDisabled(true);
            txtPassportNO.reset();
            txtPassportIssueAT.reset();
            cmbPassportCountry.reset();

            var fieldcontainer_1_1_12 = box.up('fieldcontainer')
                   .up('form')
                   .getComponent('fieldcontainer_1_1_12');
            var dtPassportIssueDate = fieldcontainer_1_1_12.getComponent('dtPassportIssueDate');
            var dtPassportExpireDate = fieldcontainer_1_1_12.getComponent('dtPassportExpireDate');
            dtPassportIssueDate.setDisabled(true);
            dtPassportExpireDate.setDisabled(true);
            dtPassportIssueDate.reset();
            dtPassportExpireDate.reset();

            if (newValue) {
                chkPassport.setValue(!newValue);

                txtPassportNO.setDisabled(false);
                txtPassportIssueAT.setDisabled(false);
                cmbPassportCountry.setDisabled(false);
                dtPassportIssueDate.setDisabled(false);
                dtPassportExpireDate.setDisabled(false);
            }
        }

        var calculateAge = function (cmb, newValue, oldValue) {
            var txtAge = cmb.up('fieldcontainer')
                            .up('fieldcontainer')
                            .getComponent('txtAge');

            txtAge.setValue(null);
            if (newValue) {
                var cmbyear = cmb.up('fieldcontainer').getComponent('cmbyear');
                var cmbmonth = cmb.up('fieldcontainer').getComponent('cmbmonth');
                var cmbday = cmb.up('fieldcontainer').getComponent('cmbday');

                var bdYear = parseInt(cmbyear.getValue());
                var bdMonth = parseInt(cmbmonth.getValue()) + 1;
                var bdDay = parseInt(cmbday.getValue());
                if (bdYear && bdMonth && bdDay) {
                    var toDay = new Date(LoginToken.toDay);
                    var age = toDay.getFullYear() - bdYear;
                    var thisMonth = toDay.getMonth() + 1;
                    
                    if (bdMonth == thisMonth) {
                        if (bdDay >= toDay.getDate()) {
                            ++age;
                        }
                    } else if (bdMonth > thisMonth) {
                        ++age;
                    }
                    txtAge.setValue(age);
                }
            }
        }

        Ext.apply(me, {
            disabled: false,
            items: [{
                xtype: 'form',
                itemId: 'mainForm',
                bodyStyle: 'background-color: transparent !important;',
                defaults: {
                    defaultType: 'textfield',
                    labelWidth: 100,
                    allowBlank: true,
                    labelAlign: 'right',
                    margin: '5 5 5 4'
                },
                width: 800,
                autoScroll: true,
                items: [
                    {
                        itemId: 'fieldcontainer_1_1_0',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            { itemId: 'txtSeq', name: 'Seq', dataIndex: 'Seq', hidden: true, sortable: true },
                            { xtype: 'displayfield', value: '<strong> 1.1 ชื่อคนต่างด้าวผู้ยื่นคำร้อง</strong>', margin: '0 0 0 3' },
                            {
                                itemId: 'txtCitizenID',
                                name: 'CitizenID',
                                xtype: 'textfield',
                                fieldLabel: 'เลขประจำตัวคนต่างด้าว<br/>Citizen ID',
                                labelSeparator: ': <span class="required">*</span> ',
                                labelWidth: 180,
                                allowBlank: false,
                                minLength: 13,
                                maxLength: 13,
                                fieldCls: 'required-text',
                                listeners: {
                                    change: function (cmb, newValue, oldValue) {
                                        if (me.workInformationPanel) {
                                            me.workInformationPanel.setWPIDND(newValue);
                                        }
                                        if (newValue) {
                                            if (newValue.length == 13) {
                                                //console.log(checkCitizenID(newValue));
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_1',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'cmbWPTName',
                                xtype: 'combo', fieldLabel: 'คำนำหน้า', width: 200,
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'Name',
                                valueField: 'ID',
                                store: 'TitleArrayStore',
                                fieldCls: 'required-text'
                            },
                            {
                                itemId: 'txtWPName', xtype: 'textfield', fieldLabel: 'ชื่อ', labelWidth: 50, maxLength: 500,
                                fieldCls: 'required-text'
                            },
                            { itemId: 'txtWPMName', xtype: 'textfield', fieldLabel: 'ชื่อกลาง', labelWidth: 80, width: 190, maxLength: 100 },
                            {
                                itemId: 'txtWPSName', xtype: 'textfield', fieldLabel: 'นามสกุล', labelWidth: 70, width: 250, maxLength: 300,
                                fieldCls: 'required-text'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_2',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                itemId: 'cmbWPTNameEN',
                                xtype: 'combo',
                                fieldLabel: 'Prefix', width: 200,
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'NameEN',
                                valueField: 'ID',
                                store: 'TitleArrayStore',
                                fieldCls: 'required-text'
                            },
                            {
                                itemId: 'txtWPNameEN', xtype: 'textfield', fieldLabel: 'Name', labelWidth: 50, maxLength: 500,
                                fieldCls: 'required-text'
                            },
                            { itemId: 'txtWPMNameEN', xtype: 'textfield', fieldLabel: 'Midlename', labelWidth: 80, width: 190, maxLength: 100 },
                            {
                                itemId: 'txtWPSNameEN', xtype: 'textfield', fieldLabel: 'Surname', labelWidth: 70, width: 250, maxLength: 300,
                                fieldCls: 'required-text'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_3',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                itemId: 'cmbWPSex',
                                xtype: 'combo',
                                fieldLabel: 'เพศ',
                                width: 170,
                                queryMode: 'local',
                                forceSelection: true,
                                fieldCls: 'required-text',
                                store: [
                                    ['M', 'ชาย'],
                                    ['F', 'หญิง']
                                ]
                            },
                            {
                                itemId: 'cmbWPNation',
                                xtype: 'combo', fieldLabel: 'สัญชาติ<br/>Nationality', emptyText: 'กรุณาเลือก',
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'NationTH',
                                valueField: 'NationCode',
                                store: 'NationalityStore',
                                fieldCls: 'required-text'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_4',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            itemId: 'fieldcontainer_1_1_4_1',
                            xtype: 'fieldcontainer',
                            defaults: {
                                defaultType: 'textfield',
                                labelWidth: 150,
                                allowBlank: true,
                                labelAlign: 'right'
                            },
                            layout: 'hbox',
                            items: [{
                                itemId: 'fieldcontainer_1_1_4_1_1',
                                xtype: 'fieldcontainer',
                                fieldLabel: 'เกิดวันที่ (ปี/เดือน/วัน)',
                                layout: 'hbox',
                                //width: '100%',
                                width: 370,
                                items: [
                                        {
                                            itemId: 'cmbyear',
                                            xtype: 'combo', width: 80,
                                            store: years,
                                            queryMode: 'local',
                                            forceSelection: true,
                                            fieldCls: 'required-text',
                                            listeners: {
                                                change: function (cmb, newValue, oldValue) {
                                                    var cmbmonth = cmb.up('fieldcontainer').getComponent('cmbmonth');
                                                    var cmbday = cmb.up('fieldcontainer').getComponent('cmbday');
                                                    var selectedMonth = cmbmonth.getValue();
                                                    //console.log('cmbyear-change');
                                                    if (selectedMonth >= 0) {
                                                        var newDays = [];
                                                        for (var i = 1; i <= 31; i++) {
                                                            var newDate = new Date(newValue, cmbmonth.getValue(), i);
                                                            if (newDate.getMonth() == cmbmonth.getValue()) {
                                                                newDays.push({ display: i, value: i });
                                                            }
                                                        }
                                                        
                                                        if (dayStore.getCount() == 0) {
                                                            dayStore.loadData(newDays);
                                                        }
                                                        else if (newDays.length != dayStore.getCount()) {
                                                            me.dayStore.loadData(newDays);
                                                            cmbday.reset();
                                                            //console.log(cmbday);
                                                        }
                                                    }

                                                    calculateAge(cmb, newValue, oldValue);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'displayfield', value: '/', margin: '0 5 0 5'
                                        },
                                        {
                                            itemId: 'cmbmonth',
                                            xtype: 'combo', width: 50,
                                            store: months,
                                            queryMode: 'local',
                                            fieldCls: 'required-text',
                                            listeners: {
                                                change: function (cmb, newValue, oldValue) {
                                                    var cmbyear = cmb.up('fieldcontainer').getComponent('cmbyear');
                                                    var cmbday = cmb.up('fieldcontainer').getComponent('cmbday');
                                                    if (cmbyear.getValue()) {
                                                        var newDays = [];
                                                        for (var i = 1; i <= 31; i++) {
                                                            var newDate = new Date(cmbyear.getValue(), newValue, i);
                                                            //console.log('cmbmonth-change = ' + newDate.getMonth());
                                                            if (newDate.getMonth() == newValue) {
                                                                newDays.push({ display: i, value: i });
                                                            }
                                                        }
                                                        
                                                        if (dayStore.getCount() == 0) {
                                                            dayStore.loadData(newDays);
                                                        }
                                                        else if (newDays.length != dayStore.getCount()) {
                                                            //cmbday.setStore(dayStore);
                                                            me.dayStore.loadData(newDays);
                                                            cmbday.reset();
                                                        }
                                                    }

                                                    calculateAge(cmb, newValue, oldValue);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'displayfield', value: '/', margin: '0 5 0 5'
                                        },
                                        {
                                            itemId: 'cmbday',
                                            xtype: 'combo', width: 50,
                                            displayField: 'display',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            store: me.dayStore,
                                            forceSelection: true,
                                            fieldCls: 'required-text',
                                            listeners: {
                                                change: function (cmb, newValue, oldValue) {
                                                    //console.log(newValue);
                                                    calculateAge(cmb, newValue, oldValue);
                                                }
                                            }
                                        }
                                ]
                            },
                            {
                                xtype: 'displayfield', value: 'อายุ', margin: '0 5 0 5', labelWidth: 60
                            },
                            {
                                itemId: 'txtAge',
                                xtype: 'textfield',
                                width: 55,
                                readOnly: true,
                                fieldCls: 'readonly'
                            },
                            {
                                xtype: 'displayfield', value: 'ปี',
                                margin: '0 0 0 5'
                            }]
                        },
                        {
                            itemId: 'cmbBloodGP',
                            xtype: 'combo', fieldLabel: 'หมู่โลหิต', labelWidth: 70,
                            store: [
                                ['O', 'O'],
                                ['B', 'B'],
                                ['A', 'A'],
                                ['AB', 'AB']
                            ], width: 150, hidden: true
                        }
                        ]
                    },
                    //-------------------------------------------------------------------------------
                    {
                        itemId: 'txtWPAddrAbd',
                        xtype: 'textfield',
                        fieldLabel: '<strong>1.2 ที่อยู่ในต่างประเทศ</strong>',
                        labelWidth: 133,
                        width: 820, margin: '0 0 6 0', labelSeparator: ''
                    },
                    {
                        itemId: 'fieldcontainer_1_1_5',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'cmbWPCountryAbd',
                                xtype: 'combo', fieldLabel: 'ประเทศ',
                                width: 400, labelWidth: 130,
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'CountryTH',
                                valueField: 'CountryAbv',
                                store: 'CountryStore'
                            },
                            {
                                itemId: 'txtWPPCodeAbd',
                                xtype: 'textfield',
                                fieldLabel: 'รหัสไปรษณีย์',
                                width: 300,
                                maxLength: 20
                            }
                        ]
                    },
                    //----------------------------------------------------------
                    {
                        xtype: 'displayfield',
                        value: '<strong>1.3 ที่อยู่ในประเทศไทย</strong>',
                        margin: '0 0 0 4'
                    },
                    {
                        itemId: 'fieldcontainer_1_1_6',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'txtWPHouse', xtype: 'textfield', fieldLabel: 'เลขที่', width: 200,
                                maxLength: 50
                            },
                            {
                                itemId: 'txtWPMoo', xtype: 'textfield', fieldLabel: 'หมู่/ชุมชน', width: 200, labelWidth: 80,
                                maxLength: 300
                            },
                            {
                                itemId: 'txtWPTrok', xtype: 'textfield', fieldLabel: 'ตรอก', labelWidth: 50,
                                maxLength: 300
                            },
                            {
                                itemId: 'txtWPSoi', xtype: 'textfield', fieldLabel: 'ซอย', labelWidth: 50,
                                maxLength: 300
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_7',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'txtWPRoad', xtype: 'textfield', fieldLabel: 'ถนน', width: 400,
                                maxLength: 300,
                                fieldCls: 'required-text'
                            },
                            {
                                itemId: 'txtWPBuilding', xtype: 'textfield', fieldLabel: 'อาคาร', width: 410, labelWidth: 50,
                                maxLength: 300
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_8',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'cmbprovince',
                                xtype: 'combo', fieldLabel: 'จังหวัด', emptyText: 'กรุณาเลือก',
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'ProvinceName',
                                valueField: 'ProvinceCode',
                                store: me.provinceStore,
                                listeners: {
                                    change: function (cmb, newValue, oldValue, eOpts) {
                                        me.amphurStore.clearFilter();
                                        me.amphurStore.filter('ProvinceCode', newValue);

                                        var cmbamphur = cmb.up('fieldcontainer').getComponent('cmbamphur');
                                        cmbamphur.reset();

                                        me.tambolStore.clearFilter();
                                        me.tambolStore.filter('ProvinceCode', -1);
                                        me.tambolStore.filter('AmphurCode', -1);
                                    }
                                },
                                fieldCls: 'required-text'
                            },
                            {
                                itemId: 'cmbamphur',
                                xtype: 'combo',
                                fieldLabel: 'อำเภอ/เขต',
                                emptyText: 'กรุณาเลือก', labelWidth: 80,
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'AmphurName',
                                valueField: 'AmphurCode',
                                store: me.amphurStore,
                                listeners: {
                                    change: function (cmb, newValue, oldValue, eOpts) {

                                        var cmbprovince = cmb.up('fieldcontainer').getComponent('cmbprovince');

                                        me.tambolStore.filter('ProvinceCode', cmbprovince.getValue());
                                        me.tambolStore.filter('AmphurCode', newValue);

                                        var cmbtambol = cmb.up('fieldcontainer').getComponent('cmbtambol');
                                        cmbtambol.reset();
                                    }
                                },
                                fieldCls: 'required-text'
                            },
                            {
                                itemId: 'cmbtambol',
                                xtype: 'combo', fieldLabel: 'ตำบล/แขวง', emptyText: 'กรุณาเลือก', labelWidth: 80,
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'TamName',
                                valueField: 'TamCode',
                                store: me.tambolStore,
                                listeners: {
                                    change: function (cmb, newValue, oldValue, eOpts) {
                                        var txtpostcode = cmb.up('fieldcontainer').getComponent('txtpostcode');
                                        txtpostcode.setLoading(true);
                                        //console.log(newValue);
                                        txtpostcode.reset();

                                        var cmbprovince = cmb.up('fieldcontainer').getComponent('cmbprovince');
                                        var cmbamphur = cmb.up('fieldcontainer').getComponent('cmbamphur');

                                        var provinceCode = cmbprovince.getValue(),
                                            amphurCode = cmbamphur.getValue();

                                        Ext.Ajax.request({
                                            url: AppConfig.urlMasterApi + '/GetPostCode'
                                                + '?tamCode=' + newValue
                                                + '&provinceCode=' + provinceCode
                                                + '&amphurCode=' + amphurCode,
                                            success: function (response) {
                                                var result = Ext.decode(response.responseText);
                                                txtpostcode.setValue(result.postCode);
                                            },
                                            failure: function (transport) {
                                                txtpostcode.reset();
                                            }
                                        });
                                    }
                                },
                                fieldCls: 'required-text'
                            },
                            {
                                itemId: 'txtpostcode',
                                xtype: 'textfield',
                                fieldLabel: 'รหัสไปรษณีย์',
                                width: 170,
                                labelWidth: 80,
                                readOnly: true,
                                fieldCls: 'readonly',
                                align: 'center'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_9',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        layout: 'hbox',
                        items: [
                            { itemId: 'txtWPTel', xtype: 'textfield', fieldLabel: 'โทรศัพย์', maxLength: 100 },
                            { itemId: 'txtWPFax', xtype: 'textfield', fieldLabel: 'โทรสาร', labelWidth: 80, maxLength: 100 },
                            {
                                itemId: 'txtWPMobile', xtype: 'textfield', fieldLabel: 'มือถือ', labelWidth: 80, maxLength: 100,
                                fieldCls: 'required-text'
                            }
                        ]
                    },
                    //----------------------------------------------------------
                    {
                        itemId: 'fieldcontainer_1_1_10',
                        xtype: 'fieldcontainer',
                        fieldLabel: '<strong>1.4</strong>',
                        layout: 'hbox',
                        labelSeparator: '',
                        defaultType: 'checkbox',
                        labelWidth: 20,
                        margin: '0 0 0 5',
                        items: [
                            {
                                itemId: 'chkPassport',
                                inputValue: 'P', boxLabel: '<strong>หนังสือเดินทาง</strong><br/>Passport',
                                listeners: {
                                    change: function (box, newValue, oldValue, eOpts) {
                                        var chkDocInPassport = box.up('fieldcontainer').getComponent('chkDocInPassport');
                                        checkboxChangePassportToggle(box, newValue, oldValue, eOpts, chkDocInPassport);
                                        
                                    }
                                }
                            },
                            {
                                itemId: 'chkDocInPassport',
                                inputValue: 'D', boxLabel: '<strong>เอกสารที่ใช้แทนหนังสือเดินทาง</strong><br/>Document in lieu passport', margin: '0 0 0 5',
                                listeners: {
                                    change: function (box, newValue, oldValue, eOpts) {
                                        var chkPassport = box.up('fieldcontainer').getComponent('chkPassport');
                                        checkboxChangePassportToggle(box, newValue, oldValue, eOpts, chkPassport);
                                    }
                                }
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_11',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 120,
                            allowBlank: true,
                            labelAlign: 'right',
                            disabled: true
                        },
                        layout: 'hbox',
                        items: [
                            { itemId: 'txtPassportNO', xtype: 'textfield', fieldLabel: 'เลขที่<br/>No.', maxLength: 50 },
                            { itemId: 'txtPassportIssueAT', xtype: 'textfield', fieldLabel: 'ออกให้ที่<br/>Issued at', width: 300, maxLength: 100 },
                            {
                                itemId: 'cmbPassportCountry',
                                xtype: 'combo', fieldLabel: 'ประเทศ<br/>Country', labelWidth: 80, width: 300,
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'CountryTH',
                                valueField: 'CountryAbv',
                                store: 'CountryStore'
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_12',
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 120,
                            allowBlank: true,
                            labelAlign: 'right',
                            disabled: true
                        },
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'dtPassportIssueDate',
                                xtype: 'datefield',
                                fieldLabel: 'ออกให้วันที่ (ค.ศ.)<br/>Date of issue',
                                format: "d/m/Y",
                                listeners: {
                                    select: function (field, value, eOpts) {
                                        var dtPassportExpireDate = field.up('fieldcontainer').getComponent('dtPassportExpireDate');
                                        dtPassportExpireDate.setMinValue(value);
                                    }
                                }
                            },
                            {
                                itemId: 'dtPassportExpireDate', xtype: 'datefield',
                                fieldLabel: 'ใช้ได้ถึงวันที่ (ค.ศ.)<br/>Valid Until',
                                format: "d/m/Y",
                                listeners: {
                                    select: function (field, value, eOpts) {
                                        var dtPassportIssueDate = field.up('fieldcontainer').getComponent('dtPassportIssueDate');
                                        dtPassportIssueDate.setMaxValue(value);
                                    }
                                }
                            }
                        ]
                    }
                    //end 1.4 --------------------------------------------------------------------------------------
                    // 1.5
                    ,{
                        itemId: 'fieldcontainer_1_1_13',
                        xtype: 'fieldcontainer',
                        fieldLabel: '<strong>1.5</strong>',
                        layout: 'hbox',
                        labelSeparator: '',
                        defaultType: 'checkbox',
                        labelWidth: 20,
                        defaults: {
                            labelWidth: 80,
                            allowBlank: true,
                            labelAlign: 'right',
                            disabled: true
                        },
                        margin: '0 5 5 5',
                        items: [
                            {
                                itemId: 'chkWPTypeOfVisa',
                                boxLabel: '<strong>ตรวจลงตราประเภท</strong><br/>Type of visa',
                                margin: '0 5 0 0', disabled: false,
                                listeners: {
                                    change: function (box, newValue, oldValue, eOpts) {
                                        var form = box.up('fieldcontainer').up('form');

                                        var fieldcontainer_1_1_13 = form.getComponent('fieldcontainer_1_1_13');
                                        var chkWPTypeOfVisa = fieldcontainer_1_1_13.getComponent('chkWPTypeOfVisa');
                                        var cmbWPTypevisa = fieldcontainer_1_1_13.getComponent('cmbWPTypevisa');
                                        var txtWPVisaNO = fieldcontainer_1_1_13.getComponent('txtWPVisaNO');
                                        var txtWPVisaIssueAT = fieldcontainer_1_1_13.getComponent('txtWPVisaIssueAT');
                                        var fieldcontainer_1_1_14 = form.getComponent('fieldcontainer_1_1_14');
                                        var dtWPVisaDateOfIssue = fieldcontainer_1_1_14.getComponent('dtWPVisaDateOfIssue');
                                        var dtWPVisaValidUntil = fieldcontainer_1_1_14.getComponent('dtWPVisaValidUntil');
                                        var dtWPArrivalDate = form.getComponent('dtWPArrivalDate');
                                        var dtWPImmiCheckpoint = form.getComponent('dtWPImmiCheckpoint');
                                        var dtWPStayableDate = form.getComponent('dtWPStayableDate');
                                        cmbWPTypevisa.setDisabled(true);
                                        txtWPVisaNO.setDisabled(true);
                                        txtWPVisaIssueAT.setDisabled(true);
                                        dtWPVisaDateOfIssue.setDisabled(true);
                                        dtWPVisaValidUntil.setDisabled(true);
                                        dtWPArrivalDate.setDisabled(true);
                                        dtWPImmiCheckpoint.setDisabled(true);
                                        dtWPStayableDate.setDisabled(true);
                                        cmbWPTypevisa.reset();
                                        txtWPVisaNO.reset();
                                        txtWPVisaIssueAT.reset();
                                        dtWPVisaDateOfIssue.reset();
                                        dtWPVisaValidUntil.reset();
                                        dtWPArrivalDate.reset();
                                        dtWPImmiCheckpoint.reset();
                                        dtWPStayableDate.reset();
                                        if (newValue) {
                                            cmbWPTypevisa.setDisabled(false);
                                            txtWPVisaNO.setDisabled(false);
                                            txtWPVisaIssueAT.setDisabled(false);
                                            dtWPVisaDateOfIssue.setDisabled(false);
                                            dtWPVisaValidUntil.setDisabled(false);
                                            dtWPArrivalDate.setDisabled(false);
                                            dtWPImmiCheckpoint.setDisabled(false);
                                            dtWPStayableDate.setDisabled(false);
                                        }
                                    }
                                }
                            },
                            {
                                itemId: 'cmbWPTypevisa',
                                xtype: 'combo',
                                displayField: 'TypevisaTH',
                                valueField: 'Typevisa',
                                queryMode: 'local',
                                store: visatypeStore,
                                margin: '10 0 0 0'
                            },
                            {
                                itemId: 'txtWPVisaNO',
                                xtype: 'textfield',
                                fieldLabel: 'เลขที่<br/>No.',
                                labelWidth: 40, width: 250,
                                margin: '10 0 0 0',
                                maxLength: 50
                            },
                            {
                                itemId: 'txtWPVisaIssueAT',
                                xtype: 'textfield',
                                fieldLabel: 'ออกให้ที่<br/>Issued at',
                                labelWidth: 80, width: 255,
                                margin: '10 0 0 0',
                                maxLength: 100
                            }
                        ]
                    },
                    {
                        itemId: 'fieldcontainer_1_1_14',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelSeparator: '',
                        defaultType: 'checkbox',
                        labelWidth: 20,
                        defaults: {
                            labelWidth: 120,
                            allowBlank: true,
                            labelAlign: 'right',
                            disabled: true
                        },
                        margin: '0 5 5 5',
                        items: [
                            {
                                itemId: 'dtWPVisaDateOfIssue', xtype: 'datefield',
                                fieldLabel: 'ออกให้วันที่ (ค.ศ.)<br/>Date of issue'
                            },
                            {
                                itemId: 'dtWPVisaValidUntil', xtype: 'datefield',
                                fieldLabel: 'ใช้ได้ถึงวันที่ (ค.ศ.)<br/>Valid Until'
                            }
                        ]
                    },
                    {
                        itemId: 'dtWPArrivalDate',
                        xtype: 'datefield',
                        fieldLabel: 'เดินทางมาถึงราชอาณาจักร เมื่อวันที่<br/>Date of arrival at the Kingdom',
                        labelWidth: 240, margin: '5 450 5 5', disabled: true
                    },
                    {
                        itemId: 'dtWPImmiCheckpoint',
                        xtype: 'textfield',
                        fieldLabel: 'ได้รับอนุญาตจากพนักงานเจ้าหน้าที่ตรวจคนเข้าเมือง ณ ที่ทำการตรวจคนเข้าเมือง<br/>Having received a permission from at the immigration checkpoint',
                        labelWidth: 460, width: 815, disabled: true,
                        maxLength: 100
                    },
                    {
                        itemId: 'dtWPStayableDate',
                        xtype: 'datefield',
                        fieldLabel: 'ให้อยู่ในราชอาณาจักร ถึงวันที่<br/>To be able to stay in the Kingdom unit',
                        labelWidth: 280, margin: '5 450 5 5', disabled: true
                    }
                    //end 1.5 --------------------------------------------------------------------------------------
                ]
            }]
        });

        me.callParent(arguments);
    },

    getAlienInformation: function () {
        var me = this;

        var mainForm = me.getComponent('mainForm');
        var fieldcontainer_1_1_0 = mainForm.getComponent('fieldcontainer_1_1_0');
        
        var txtCitizenID = fieldcontainer_1_1_0.getComponent('txtCitizenID');
        if (!txtCitizenID.isValid()
            || !me.isCitizenID(txtCitizenID.getValue())) {
            Ext.MessageBox.show({
                title: 'การกรอกข้อมูลไม่ถูกต้อง',
                msg: 'กรุณาระบุ Citizen ID ให้ถูกต้อง',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                fn: function (btn) {
                    txtCitizenID.focus();
                }
            });

            //txtCitizenID.focus();
            return false;
        }


        var txtSeq = fieldcontainer_1_1_0.getComponent('txtSeq');

        var fieldcontainer_1_1_1 = mainForm.getComponent('fieldcontainer_1_1_1');
        var cmbWPTName = fieldcontainer_1_1_1.getComponent('cmbWPTName');
        var txtWPName = fieldcontainer_1_1_1.getComponent('txtWPName');
        var txtWPMName = fieldcontainer_1_1_1.getComponent('txtWPMName');
        var txtWPSName = fieldcontainer_1_1_1.getComponent('txtWPSName');

        var fieldcontainer_1_1_2 = mainForm.getComponent('fieldcontainer_1_1_2');
        var cmbWPTNameEN = fieldcontainer_1_1_2.getComponent('cmbWPTNameEN');
        var txtWPNameEN = fieldcontainer_1_1_2.getComponent('txtWPNameEN');
        var txtWPMNameEN = fieldcontainer_1_1_2.getComponent('txtWPMNameEN');
        var txtWPSNameEN = fieldcontainer_1_1_2.getComponent('txtWPSNameEN');

        var fieldcontainer_1_1_3 = mainForm.getComponent('fieldcontainer_1_1_3');
        var cmbWPSex = fieldcontainer_1_1_3.getComponent('cmbWPSex');
        var cmbWPNation = fieldcontainer_1_1_3.getComponent('cmbWPNation');

        var fieldcontainer_1_1_4 = mainForm.getComponent('fieldcontainer_1_1_4');
        var fieldcontainer_1_1_4_1 = fieldcontainer_1_1_4.getComponent('fieldcontainer_1_1_4_1');
        var fieldcontainer_1_1_4_1_1 = fieldcontainer_1_1_4_1.getComponent('fieldcontainer_1_1_4_1_1');
        var cmbyear = fieldcontainer_1_1_4_1_1.getComponent('cmbyear');
        var cmbmonth = fieldcontainer_1_1_4_1_1.getComponent('cmbmonth');
        var cmbday = fieldcontainer_1_1_4_1_1.getComponent('cmbday');
        var txtAge = fieldcontainer_1_1_4_1.getComponent('txtAge');
        var cmbBloodGP = fieldcontainer_1_1_4.getComponent('cmbBloodGP');

        var txtWPAddrAbd = mainForm.getComponent('txtWPAddrAbd');

        var fieldcontainer_1_1_5 = mainForm.getComponent('fieldcontainer_1_1_5');
        var cmbWPCountryAbd = fieldcontainer_1_1_5.getComponent('cmbWPCountryAbd');
        var txtWPPCodeAbd = fieldcontainer_1_1_5.getComponent('txtWPPCodeAbd');

        var fieldcontainer_1_1_6 = mainForm.getComponent('fieldcontainer_1_1_6');
        var txtWPHouse = fieldcontainer_1_1_6.getComponent('txtWPHouse');
        var txtWPMoo = fieldcontainer_1_1_6.getComponent('txtWPMoo');
        var txtWPTrok = fieldcontainer_1_1_6.getComponent('txtWPTrok');
        var txtWPSoi = fieldcontainer_1_1_6.getComponent('txtWPSoi');

        var fieldcontainer_1_1_7 = mainForm.getComponent('fieldcontainer_1_1_7');
        var txtWPRoad = fieldcontainer_1_1_7.getComponent('txtWPRoad');
        var txtWPBuilding = fieldcontainer_1_1_7.getComponent('txtWPBuilding');

        var fieldcontainer_1_1_8 = mainForm.getComponent('fieldcontainer_1_1_8');
        var cmbprovince = fieldcontainer_1_1_8.getComponent('cmbprovince');
        var cmbamphur = fieldcontainer_1_1_8.getComponent('cmbamphur');
        var cmbtambol = fieldcontainer_1_1_8.getComponent('cmbtambol');
        var txtpostcode = fieldcontainer_1_1_8.getComponent('txtpostcode');

        var fieldcontainer_1_1_9 = mainForm.getComponent('fieldcontainer_1_1_9');
        var txtWPTel = fieldcontainer_1_1_9.getComponent('txtWPTel');
        var txtWPFax = fieldcontainer_1_1_9.getComponent('txtWPFax');
        var txtWPMobile = fieldcontainer_1_1_9.getComponent('txtWPMobile');

        // 1.4 ------------------------------------------------------------------
        var fieldcontainer_1_1_10 = mainForm.getComponent('fieldcontainer_1_1_10');
        var chkPassport = fieldcontainer_1_1_10.getComponent('chkPassport');
        var chkDocInPassport = fieldcontainer_1_1_10.getComponent('chkDocInPassport');
        var wpPassportFlag = '';
        if (chkPassport.getValue()) {
            wpPassportFlag = 'P';
        } else if (chkDocInPassport.getValue()) {
            wpPassportFlag = 'D';
        }

        var fieldcontainer_1_1_11 = mainForm.getComponent('fieldcontainer_1_1_11');
        var txtPassportNO = fieldcontainer_1_1_11.getComponent('txtPassportNO');
        var txtPassportIssueAT = fieldcontainer_1_1_11.getComponent('txtPassportIssueAT');
        var cmbPassportCountry = fieldcontainer_1_1_11.getComponent('cmbPassportCountry');

        var fieldcontainer_1_1_12 = mainForm.getComponent('fieldcontainer_1_1_12');
        var dtPassportIssueDate = fieldcontainer_1_1_12.getComponent('dtPassportIssueDate');
        var dtPassportExpireDate = fieldcontainer_1_1_12.getComponent('dtPassportExpireDate');

        // 1.5 ------------------------------------------------------------------
        var fieldcontainer_1_1_13 = mainForm.getComponent('fieldcontainer_1_1_13');
        var chkWPTypeOfVisa = fieldcontainer_1_1_13.getComponent('chkWPTypeOfVisa');
        var cmbWPTypevisa = fieldcontainer_1_1_13.getComponent('cmbWPTypevisa');
        var txtWPVisaNO = fieldcontainer_1_1_13.getComponent('txtWPVisaNO');
        var txtWPVisaIssueAT = fieldcontainer_1_1_13.getComponent('txtWPVisaIssueAT');
        var fieldcontainer_1_1_14 = mainForm.getComponent('fieldcontainer_1_1_14');
        var dtWPVisaDateOfIssue = fieldcontainer_1_1_14.getComponent('dtWPVisaDateOfIssue');
        var dtWPVisaValidUntil = fieldcontainer_1_1_14.getComponent('dtWPVisaValidUntil');
        var dtWPArrivalDate = mainForm.getComponent('dtWPArrivalDate');
        var dtWPImmiCheckpoint = mainForm.getComponent('dtWPImmiCheckpoint');
        var dtWPStayableDate = mainForm.getComponent('dtWPStayableDate');

        var newFormWp2 = Ext.create('widget.formwp2', {
            Seq: txtSeq.getValue(),
            CitizenID: txtCitizenID.getValue(),
            WPTName: cmbWPTName.getRawValue(),
            WPTNameEN: cmbWPTNameEN.getRawValue(),
            WPName: txtWPName.getValue(),
            WPNameEN: txtWPNameEN.getValue(),
            WPMName: txtWPMName.getValue(),
            WPMNameEN: txtWPMNameEN.getValue(),
            WPSName: txtWPSName.getValue(),
            WPSNameEN: txtWPSNameEN.getValue(),
            WPSex: cmbWPSex.getValue(),
            WPNation: cmbWPNation.getValue(),
            WPBDateYear: cmbyear.getRawValue(),
            WPBDateMonth: cmbmonth.getRawValue(),
            WPBDateDay: cmbday.getRawValue(),
            WPAge: txtAge.getValue(),
            WPBloodGp: cmbBloodGP.getRawValue(),
            WPAddrAbd: txtWPAddrAbd.getValue(),
            WPCountryAbd: cmbWPCountryAbd.getValue(),
            WPPCodeAbd: txtWPPCodeAbd.getValue(),
            WPHouse: txtWPHouse.getValue(),
            WPMoo: txtWPMoo.getValue(),
            WPTrok: txtWPTrok.getValue(),
            WPSoi: txtWPSoi.getValue(),
            WPRoad: txtWPRoad.getValue(),
            WPBuilding: txtWPBuilding.getValue(),
            WPProv: cmbprovince.getValue(),
            WPAmp: cmbamphur.getValue(),
            WPTamb: cmbtambol.getValue(),
            WPPost: txtpostcode.getValue(),

            WPTel: txtWPTel.getValue(),
            WPFax: txtWPFax.getValue(),
            WPMobile: txtWPMobile.getValue(),

            // 1.4 -------------------------------------------------------
            WPPassportFlag: wpPassportFlag,
            WPPassportNO: txtPassportNO.getValue(),
            WPPassportIssueAT: txtPassportIssueAT.getValue(),
            WPPassportCountry: cmbPassportCountry.getValue(),
            WPPassportIssueDate: dtPassportIssueDate.getValue(),
            WPPassportExpireDate: dtPassportExpireDate.getValue()

            // 1.5 -------------------------------------------------------
            ,WPVisaType: cmbWPTypevisa.getValue(),
            WPVisaNO: txtWPVisaNO.getValue(),
            WPVisaIssueAT: txtWPVisaIssueAT.getValue(),
            WPVisaIssueDate: dtWPVisaDateOfIssue.getValue(),
            WPVisaExpireDate: dtWPVisaValidUntil.getValue(),
            WPArrivalDate: dtWPArrivalDate.getValue(),
            WPImmiCheckpoint: dtWPImmiCheckpoint.getValue(),
            WPStayableDate: dtWPStayableDate.getValue()
        });
        
        return newFormWp2;
    },

    setValue: function (data) {
        var me = this;
        var mainForm = me.getComponent('mainForm');

        var fieldcontainer_1_1_0 = mainForm.getComponent('fieldcontainer_1_1_0');

        var txtSeq = fieldcontainer_1_1_0.getComponent('txtSeq');
        var txtCitizenID = fieldcontainer_1_1_0.getComponent('txtCitizenID');
        txtSeq.setValue(data.Seq);
        txtCitizenID.setValue(data.CitizenID);

        var fieldcontainer_1_1_1 = mainForm.getComponent('fieldcontainer_1_1_1');
        var cmbWPTName = fieldcontainer_1_1_1.getComponent('cmbWPTName');
        var txtWPName = fieldcontainer_1_1_1.getComponent('txtWPName');
        var txtWPMName = fieldcontainer_1_1_1.getComponent('txtWPMName');
        var txtWPSName = fieldcontainer_1_1_1.getComponent('txtWPSName');
        cmbWPTName.setRawValue(data.WPTName);
        txtWPName.setValue(data.WPName);
        txtWPMName.setValue(data.WPMName);
        txtWPSName.setValue(data.WPSName);

        var fieldcontainer_1_1_2 = mainForm.getComponent('fieldcontainer_1_1_2');
        var cmbWPTNameEN = fieldcontainer_1_1_2.getComponent('cmbWPTNameEN');
        var txtWPNameEN = fieldcontainer_1_1_2.getComponent('txtWPNameEN');
        var txtWPMNameEN = fieldcontainer_1_1_2.getComponent('txtWPMNameEN');
        var txtWPSNameEN = fieldcontainer_1_1_2.getComponent('txtWPSNameEN');
        cmbWPTNameEN.setRawValue(data.WPTNameEN);
        txtWPNameEN.setValue(data.WPNameEN);
        txtWPMNameEN.setValue(data.WPMNameEN);
        txtWPSNameEN.setValue(data.WPSNameEN);

        var fieldcontainer_1_1_3 = mainForm.getComponent('fieldcontainer_1_1_3');
        var cmbWPSex = fieldcontainer_1_1_3.getComponent('cmbWPSex');
        var cmbWPNation = fieldcontainer_1_1_3.getComponent('cmbWPNation');
        cmbWPSex.setValue(data.WPSex);
        cmbWPNation.setValue(data.WPNation);

        var fieldcontainer_1_1_4 = mainForm.getComponent('fieldcontainer_1_1_4');
        var fieldcontainer_1_1_4_1 = fieldcontainer_1_1_4.getComponent('fieldcontainer_1_1_4_1');
        var fieldcontainer_1_1_4_1_1 = fieldcontainer_1_1_4_1.getComponent('fieldcontainer_1_1_4_1_1');
        var cmbyear = fieldcontainer_1_1_4_1_1.getComponent('cmbyear');
        var cmbmonth = fieldcontainer_1_1_4_1_1.getComponent('cmbmonth');
        var cmbday = fieldcontainer_1_1_4_1_1.getComponent('cmbday');
        var txtAge = fieldcontainer_1_1_4_1.getComponent('txtAge');
        var cmbBloodGP = fieldcontainer_1_1_4.getComponent('cmbBloodGP');
        cmbyear.setValue(parseInt(data.WPBDateYear));
        if (parseInt(data.WPBDateMonth) >= 0) {
            cmbmonth.setValue(parseInt(data.WPBDateMonth - 1));
        }
        cmbday.setValue(parseInt(data.WPBDateDay));
        txtAge.setValue(data.WPAge);
        cmbBloodGP.setRawValue(data.WPBloodGp);

        var txtWPAddrAbd = mainForm.getComponent('txtWPAddrAbd');
        txtWPAddrAbd.setValue(data.WPAddrAbd);

        var fieldcontainer_1_1_5 = mainForm.getComponent('fieldcontainer_1_1_5');
        var cmbWPCountryAbd = fieldcontainer_1_1_5.getComponent('cmbWPCountryAbd');
        var txtWPPCodeAbd = fieldcontainer_1_1_5.getComponent('txtWPPCodeAbd');
        cmbWPCountryAbd.setValue(data.WPCountryAbd);
        txtWPPCodeAbd.setValue(data.WPPCodeAbd);

        var fieldcontainer_1_1_6 = mainForm.getComponent('fieldcontainer_1_1_6');
        var txtWPHouse = fieldcontainer_1_1_6.getComponent('txtWPHouse');
        var txtWPMoo = fieldcontainer_1_1_6.getComponent('txtWPMoo');
        var txtWPTrok = fieldcontainer_1_1_6.getComponent('txtWPTrok');
        var txtWPSoi = fieldcontainer_1_1_6.getComponent('txtWPSoi');
        txtWPHouse.setValue(data.WPHouse);
        txtWPMoo.setValue(data.WPMoo);
        txtWPTrok.setValue(data.WPTrok);
        txtWPSoi.setValue(data.WPSoi);

        var fieldcontainer_1_1_7 = mainForm.getComponent('fieldcontainer_1_1_7');
        var txtWPRoad = fieldcontainer_1_1_7.getComponent('txtWPRoad');
        var txtWPBuilding = fieldcontainer_1_1_7.getComponent('txtWPBuilding');
        txtWPRoad.setValue(data.WPRoad);
        txtWPBuilding.setValue(data.WPBuilding);

        var fieldcontainer_1_1_8 = mainForm.getComponent('fieldcontainer_1_1_8');
        var cmbprovince = fieldcontainer_1_1_8.getComponent('cmbprovince');
        var cmbamphur = fieldcontainer_1_1_8.getComponent('cmbamphur');
        var cmbtambol = fieldcontainer_1_1_8.getComponent('cmbtambol');
        var txtpostcode = fieldcontainer_1_1_8.getComponent('txtpostcode');
        cmbprovince.setValue(data.WPProv);
        cmbamphur.setValue(data.WPAmp);
        cmbtambol.setValue(data.WPTamb);
        txtpostcode.setValue(data.WPPost);

        var fieldcontainer_1_1_9 = mainForm.getComponent('fieldcontainer_1_1_9');
        var txtWPTel = fieldcontainer_1_1_9.getComponent('txtWPTel');
        var txtWPFax = fieldcontainer_1_1_9.getComponent('txtWPFax');
        var txtWPMobile = fieldcontainer_1_1_9.getComponent('txtWPMobile');
        txtWPTel.setValue(data.WPTel);
        txtWPFax.setValue(data.WPFax);
        txtWPMobile.setValue(data.WPMobile);

        // 1.4 ------------------------------------------------------------------
        var fieldcontainer_1_1_10 = mainForm.getComponent('fieldcontainer_1_1_10');
        var chkPassport = fieldcontainer_1_1_10.getComponent('chkPassport');
        var chkDocInPassport = fieldcontainer_1_1_10.getComponent('chkDocInPassport');
        var fieldcontainer_1_1_11 = mainForm.getComponent('fieldcontainer_1_1_11');
        var txtPassportNO = fieldcontainer_1_1_11.getComponent('txtPassportNO');
        var txtPassportIssueAT = fieldcontainer_1_1_11.getComponent('txtPassportIssueAT');
        var cmbPassportCountry = fieldcontainer_1_1_11.getComponent('cmbPassportCountry');
        var fieldcontainer_1_1_12 = mainForm.getComponent('fieldcontainer_1_1_12');
        var dtPassportIssueDate = fieldcontainer_1_1_12.getComponent('dtPassportIssueDate');
        var dtPassportExpireDate = fieldcontainer_1_1_12.getComponent('dtPassportExpireDate');

        if (data.WPPassportFlag === 'P') {
            txtPassportNO.setDisabled(false);
            txtPassportIssueAT.setDisabled(false);
            cmbPassportCountry.setDisabled(false);
            dtPassportIssueDate.setDisabled(false);
            dtPassportIssueDate.setDisabled(false);
            chkPassport.setDisabled(false);
            chkDocInPassport.setDisabled(false);

            chkPassport.setValue(true);
            txtPassportNO.setValue(data.WPPassportNO);
            txtPassportIssueAT.setValue(data.WPPassportIssueAT);
            cmbPassportCountry.setValue(data.WPPassportCountry);
            dtPassportIssueDate.setValue(data.WPPassportIssueDate);
            dtPassportExpireDate.setValue(data.WPPassportExpireDate);

        } else if (data.WPPassportFlag === 'D') {
            txtPassportNO.setDisabled(false);
            txtPassportIssueAT.setDisabled(false);
            cmbPassportCountry.setDisabled(false);
            dtPassportIssueDate.setDisabled(false);
            dtPassportIssueDate.setDisabled(false);
            chkPassport.setDisabled(false);
            chkDocInPassport.setDisabled(false);

            chkDocInPassport.setValue(true);
            txtPassportNO.setValue(data.WPPassportNO);
            txtPassportIssueAT.setValue(data.WPPassportIssueAT);
            cmbPassportCountry.setValue(data.WPPassportCountry);
            dtPassportIssueDate.setValue(data.WPPassportIssueDate);
            dtPassportExpireDate.setValue(data.WPPassportExpireDate);
        }

        // 1.5 ------------------------------------------------------------------
        var fieldcontainer_1_1_13 = mainForm.getComponent('fieldcontainer_1_1_13');
        var chkWPTypeOfVisa = fieldcontainer_1_1_13.getComponent('chkWPTypeOfVisa');
        var cmbWPTypevisa = fieldcontainer_1_1_13.getComponent('cmbWPTypevisa');
        var txtWPVisaNO = fieldcontainer_1_1_13.getComponent('txtWPVisaNO');
        var txtWPVisaIssueAT = fieldcontainer_1_1_13.getComponent('txtWPVisaIssueAT');
        var fieldcontainer_1_1_14 = mainForm.getComponent('fieldcontainer_1_1_14');
        var dtWPVisaDateOfIssue = fieldcontainer_1_1_14.getComponent('dtWPVisaDateOfIssue');
        var dtWPVisaValidUntil = fieldcontainer_1_1_14.getComponent('dtWPVisaValidUntil');
        var dtWPArrivalDate = mainForm.getComponent('dtWPArrivalDate');
        var dtWPImmiCheckpoint = mainForm.getComponent('dtWPImmiCheckpoint');
        var dtWPStayableDate = mainForm.getComponent('dtWPStayableDate');

        if (data.WPVisaType ||
            data.WPVisaNO ||
            data.WPVisaIssueAT ||
            data.WPVisaIssueDate ||
            data.WPVisaExpireDate ||
            data.WPArrivalDate ||
            data.WPImmiCheckpoint ||
            data.WPStayableDate) {
            chkWPTypeOfVisa.setValue(true);

            cmbWPTypevisa.setValue(data.WPVisaType);
            txtWPVisaNO.setValue(data.WPVisaNO);
            txtWPVisaIssueAT.setValue(data.WPVisaIssueAT);
            dtWPVisaDateOfIssue.setValue(data.WPVisaIssueDate);
            dtWPVisaValidUntil.setValue(data.WPVisaExpireDate);
            dtWPArrivalDate.setValue(data.WPArrivalDate);
            dtWPImmiCheckpoint.setValue(data.WPImmiCheckpoint);
            dtWPStayableDate.setValue(data.WPStayableDate);
        }
    },

    reset: function () {
        var me = this;

        var mainForm = me.getComponent('mainForm');
        mainForm.reset();


    },

    isCitizenID: function (id) {
        if (id.length < 13) return false;
        var citizenID = parseInt(id);
        if (!isNaN(citizenID)) {
            var output = [],
            sNumber = citizenID.toString();
            for (var i = 0, len = sNumber.length; i < len; i += 1) {
                output.push(+sNumber.charAt(i));
            }

            var x = 0;
            var index = 0;
            for (var j = 13; j >= 2; j--) {
                x += j * parseInt(output[index]);
                ++index;
            }

            var n13 = 0;
            x = x % 11;
            if (x <= 1) {
                n13 = 1 - x;
            } else {
                n13 = 11 - x;
            }

            return output[12] == n13;
        }
        return false;
    }
});