Ext.define(AppConfig.appName + '.view.formWP2.FormWP2Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'formwp2panel',
    resizable: false,
    closable: false,
    layout: 'border',
    height: 150,
    title: 'แบบ ตท. ๒ <br/> Form WP. 2',

    initComponent: function () {
        var me = this;

        me.employerStore = Ext.create('widget.employerstore');
        me.employerStore.load();

        me.provinceStore = Ext.create('widget.provincestore');
        me.amphurStore = Ext.create('widget.amphurstore');
        me.tambolStore = Ext.create('widget.tambolstore');

        me.alienProvinceStore = Ext.create('widget.provincestore');
        me.alienAmphurStore = Ext.create('widget.amphurstore');
        me.alienTambolStore = Ext.create('widget.tambolstore');

        me.appInfo1ProvinceStore = Ext.create('widget.provincestore');
        me.appInfo1AmphurStore = Ext.create('widget.amphurstore');
        me.appInfo1TambolStore = Ext.create('widget.tambolstore');

        me.workInfoProvinceStore = Ext.create('widget.provincestore');

        me.province1Store = Ext.create('widget.provincestore');
        me.amphur1Store = Ext.create('widget.amphurstore');
        me.tambol1Store = Ext.create('widget.tambolstore');

        me.province2Store = Ext.create('widget.provincestore');
        me.amphur2Store = Ext.create('widget.amphurstore');
        me.tambol2Store = Ext.create('widget.tambolstore');

        me.province3Store = Ext.create('widget.provincestore');
        me.amphur3Store = Ext.create('widget.amphurstore');
        me.tambol3Store = Ext.create('widget.tambolstore');

        me.province4Store = Ext.create('widget.provincestore');
        me.amphur4Store = Ext.create('widget.amphurstore');
        me.tambol4Store = Ext.create('widget.tambolstore');

        me.provinceStore.load({
            callback: function (records, operation, success) {
                me.alienProvinceStore.loadData(records);
                me.appInfo1ProvinceStore.loadData(records);
                me.workInfoProvinceStore.loadData(records);

                me.province1Store.loadData(records);
                me.province2Store.loadData(records);
                me.province3Store.loadData(records);
                me.province4Store.loadData(records);
            }
        });
        me.amphurStore.load({
            callback: function (records, operation, success) {
                me.alienAmphurStore.loadData(records);
                me.appInfo1AmphurStore.loadData(records);

                me.amphur1Store.loadData(records);
                me.amphur2Store.loadData(records);
                me.amphur3Store.loadData(records);
                me.amphur4Store.loadData(records);
            }
        });
        me.tambolStore.load({
            callback: function (records, operation, success) {
                me.alienTambolStore.loadData(records);
                me.appInfo1TambolStore.loadData(records);

                me.tambol1Store.loadData(records);
                me.tambol2Store.loadData(records);
                me.tambol3Store.loadData(records);
                me.tambol4Store.loadData(records);
            }
        });

        me.buCategoryStore = Ext.create('widget.bucategorystore');
        me.buTypeStore = Ext.create('widget.butypestore');

        me.buCategoryStore.load();
        me.buTypeStore.load();

        me.formWP2Store = Ext.create('widget.formwp2store');
        me.formWP2Store.load();

        me.addFormWP2Window = function (view, event) {
            event.stopEvent();

            var newForm = Ext.create('widget.formwp2window', {
                iconCls: 'add-icon',
                modal: true,
                animateTarget: view,
                title: view.getText(),

                provinceStore: me.provinceStore,
                amphurStore: me.amphurStore,
                tambolStore: me.tambolStore,

                alienProvinceStore: me.alienProvinceStore,
                alienAmphurStore: me.alienAmphurStore,
                alienTambolStore: me.alienTambolStore,

                appInfo1ProvinceStore: me.appInfo1ProvinceStore,
                appInfo1AmphurStore: me.appInfo1AmphurStore,
                appInfo1TambolStore: me.appInfo1TambolStore,

                workInfoProvinceStore: me.workInfoProvinceStore,

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
                formWP2Store: me.formWP2Store
            });

            newForm.setVersion(0);
            newForm.show();
        }

        me.editFormWP2Window = function (grid, rowIndex, colIndex, item, event, record, row) {
            event.stopEvent();
            grid.getSelectionModel().select(record);

            var editForm = Ext.create('widget.formwp2window', {
                iconCls: 'edit-icon',
                modal: true,
                animateTarget: row,
                title: TextLabel.editCmdLabel,

                provinceStore: me.provinceStore,
                amphurStore: me.amphurStore,
                tambolStore: me.tambolStore,

                alienProvinceStore: me.alienProvinceStore,
                alienAmphurStore: me.alienAmphurStore,
                alienTambolStore: me.alienTambolStore,

                appInfo1ProvinceStore: me.appInfo1ProvinceStore,
                appInfo1AmphurStore: me.appInfo1AmphurStore,
                appInfo1TambolStore: me.appInfo1TambolStore,

                workInfoProvinceStore: me.workInfoProvinceStore,

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
                formWP2Store: me.formWP2Store,

                editData: record.data
            });


            editForm.setAlienInformation(record.data);
            editForm.show();
        }

        var searchWPForm = function () {
            var searchEmid = Ext.getCmp('search-emid');
            var searchCitizenID = Ext.getCmp('search-citizenID');
            var searchAName = Ext.getCmp('search-aName');
            var searchAMName = Ext.getCmp('search-aMName');
            var searchASName = Ext.getCmp('search-aSName');
            var searchWPStatus = Ext.getCmp('search-wpStatus');

            var emid = searchEmid.getValue();
            var citizenID = searchCitizenID.getValue();
            var aName = searchAName.getValue();
            var aMName = searchAMName.getValue();
            var aSName = searchASName.getValue();
            var wpStatus = searchWPStatus.getValue();

            //console.log(emid);
            //console.log(citizenID);
            //console.log(aName);
            //console.log(aMName);
            //console.log(aSName);
            //console.log(wpStatus);

            me.formWP2Store.currentPage = 1;
            me.formWP2Store.proxy.extraParams.emid = emid;
            me.formWP2Store.proxy.extraParams.citizenID = citizenID;
            me.formWP2Store.proxy.extraParams.aName = aName;
            me.formWP2Store.proxy.extraParams.aMName = aMName;
            me.formWP2Store.proxy.extraParams.aSName = aSName;
            me.formWP2Store.proxy.extraParams.wpStatus = wpStatus;
            me.formWP2Store.load();
        }

        Ext.apply(me, {
            items: [{
                xtype: 'form',
                region: 'north',
                height: 190,
                layout: 'vbox',
                //bodyStyle: 'background: transparent; border-width: 0px',
                defaults: {
                    labelWidth: 100,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    defaults: {
                        defaultType: 'textfield',
                        labelWidth: 100,
                        allowBlank: true,
                        labelAlign: 'right'
                    },
                    margin: '5 5 5 5',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            id: 'search-emid',
                            xtype: 'combo',
                            fieldLabel: 'นายจ้าง',
                            width: 590,
                            emptyText: 'ทั้งหมด',
                            margin: '0 0 5 180',
                            store: me.employerStore,
                            displayField: 'Display',
                            valueField: 'EMID',
                            pageSize: 50,
                            allowBlank: true,
                            labelWidth: 95,
                            queryMode: 'remote'
                        }, {
                            id: 'search-citizenID',
                            xtype: 'textfield',
                            fieldLabel: 'เลขประจำตัวลูกจ้าง',
                            margin: '0 0 5 5',
                            width: 300,
                            labelWidth: 120
                        }
                    ]
                },
                    {
                        xtype: 'fieldcontainer',
                        defaults: {
                            defaultType: 'textfield',
                            labelWidth: 100,
                            allowBlank: true,
                            labelAlign: 'right'
                        },
                        margin: '0 0 5 180',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                id: 'search-aName',
                                fieldLabel: 'ลูกจ้าง',
                                width: 300,
                                xtype: 'textfield',
                                emptyText: 'ชื่อ'
                            },
                            {
                                id: 'search-aMName',
                                width: 200,
                                xtype: 'textfield',
                                emptyText: 'ชื่อกลาง'
                            },
                            {
                                id: 'search-aSName',
                                width: 400,
                                xtype: 'textfield',
                                emptyText: 'นามสกุล'
                            }
                        ]
                    },
                    {
                        id: 'search-wpStatus',
                        xtype: 'radiogroup',
                        fieldLabel: 'การกรอกข้อมูล',
                        labelAlign: 'right',
                        margin: '5 5 5 180',
                        items: [{
                            checked: true,
                            boxLabel: 'ทั้งหมด',
                            name: 'wp-status',
                            inputValue: 'All',
                            width: 100
                        }, {
                            boxLabel: 'ยังไม่สมบูรณ์',
                            name: 'wp-status',
                            inputValue: 'DRF',
                            width: 100
                        }, {
                            boxLabel: 'สมบูรณ์',
                            name: 'wp-status',
                            inputValue: 'CMP',
                            width: 100
                        }]
                    }
                ],
                buttonAlign: 'center',
                buttons: [{
                    text: 'ค้นหา',
                    iconCls: 'search-icon',
                    handler: function (widget, event) {
                        searchWPForm();
                    }
                }, {
                    text: 'ล้างข้อมูล',
                    iconCls: 'reset-icon',
                    handler: function (widget, event) {
                        var form = widget.up('form');
                        form.reset();

                        searchWPForm();
                    }
                }]
            }, {
                region: 'center',
                xtype: 'gridpanel',
                columnLines: true,
                store: me.formWP2Store,
                columns: {
                    items: [
                        //Ext.create('widget.rownumberer', { locked: true, width: 50 }),
                        {
                            xtype: 'actioncolumn',
                            width: 60,
                            items: [{
                                iconCls: 'edit-icon',
                                tooltip: TextLabel.editCmdLabel,
                                xtype: 'button',
                                handler: me.editFormWP2Window
                            }, {
                                iconCls: 'delete-icon',
                                tooltip: TextLabel.deleteCmdLabel,
                                xtype: 'button',
                                isDisabled: function (view, rowIndex, colIndex, item, record) {
                                    var wpStatus = record.get('WPStatus');
                                    if (wpStatus === 'DRF') {
                                        return false;
                                    } 
                                    return true;
                                },
                                handler: function (grid, rowIndex, colIndex, item, event, record, row) {
                                    grid.getSelectionModel().select(record);
                                    Ext.MessageBox.confirm('ยืนยัน', 'คุณต้องการลบข้อมูลนี้ใช่ หรือ ไม่?',
                                    function (btn) {
                                        if (btn === "yes") {
                                            Ext.MessageBox.wait("กำลังลบข้อมูล...", 'กรุณารอ');
                                            record.erase({
                                                success: function (record, operation) {
                                                    me.formWP2Store.load();
                                                    Ext.MessageBox.show({
                                                        title: TextLabel.successTitle,
                                                        msg: 'ลบข้อมูลเสร็จสมบูรณ์',
                                                        animateTarget: record,
                                                        //width: 300,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.INFO,
                                                        fn: function (btn) {
                                                        }
                                                    });
                                                },
                                                failure: function (record, operation) {
                                                    me.formWP2Store.load();
                                                }
                                            });
                                        }
                                    });
                                }
                            }]
                        },
                        { text: 'Seq', dataIndex: 'Seq', width: 100, align: 'center', hidden: true },
                        { text: TextLabel.citizenID, dataIndex: 'CitizenID', width: 130, align: 'center' },
                        { text: TextLabel.employerFullName, dataIndex: 'EMFullName', width: 400 },
                        { text: TextLabel.alienFullName, dataIndex: 'AlienFullName', width: 300 },
                        {
                            text: TextLabel.formStatus, dataIndex: 'WPStatus', width: 150, align: 'center',
                            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                                // Sample value: msimms & Co. "like" putting <code> tags around your code
                                //console.log(record);
                                var wpStatus = record.get('WPStatus');
                                if (wpStatus === 'CMP') {
                                    metaData.style = "background-color:#D1FFD1;";
                                } else {
                                    metaData.style = "background-color:#FFFFE8;";
                                }
                                return value;
                            }
                        },
                        { text: 'Version', dataIndex: 'Version', width: 70, align: 'center' }
                    ],
                    defaults: {
                        sortable: false,
                        menuDisabled: true,
                        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                            if (value) {
                                value = Ext.String.htmlEncode(value);
                                var display = value;
                                if (value === 'CMP') {
                                    display = 'Completed';
                                } else if (value === 'DRF') {
                                    display = 'Draft';
                                }
                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(display) + '"';
                            }
                            return value;
                        }
                    }
                },
                tbar: [{
                    xtype: 'button',
                    iconCls: 'add-icon',
                    text: TextLabel.add + TextLabel.formWp2Name,
                    tooltip: TextLabel.add + TextLabel.formWp2Name,
                    handler: this.addFormWP2Window
                }],
                // paging bar on the bottom
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: me.formWP2Store,
                    displayInfo: true,
                    displayMsg: TextLabel.formWp2 + ' ที่กำลังแสดงอยู่ {0} - {1} จาก {2}',
                    emptyMsg: "ไม่มี " + TextLabel.formWp2
                })
            }]
        });

        me.callParent(arguments);
    }
});