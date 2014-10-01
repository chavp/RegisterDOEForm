Ext.define(AppConfig.appName + '.view.formWP2.EmployerWorkplaceManagmentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'employerworkplacemanagmentpanel',
    resizable: false,
    closable: false,
    layout: 'border',
    title: 'การจัดการนายจ้าง',

    initComponent: function () {
        var me = this;

        me.employerStore = Ext.create('widget.employerstore', {
            pageSize: 15
        });
        me.employerStore.proxy.api.read = AppConfig.urlMasterApi + '/FindMasterEmployer';
        me.employerStore.reload();

        me.myEmployerStore = Ext.create('widget.employerstore', {
            autoLoad: true
        });

        me.employerWorkplaceStore = Ext.create('widget.employerworkplacestore');

        me.onTextFieldChange = function (txt, newValue, oldValue, eOpts) {
            me.employerStore.proxy.extraParams.emName = newValue;
            me.employerStore.load();

        };

        Ext.apply(me, {
            items: [{
                xtype: 'gridpanel',
                region: 'west',
                title: 'นายจ้างที่มีอยู่ในระบบ',
                width: 500,
                collapsible: true,
                split: 5,
                tbar: ['', {
                    xtype: 'textfield',
                    name: 'searchEMNAME',
                    hideLabel: true,
                    width: 350,
                    emptyText: 'เลขประจำตัวนายจ้าง / ชื่อนายจ้าง',
                    listeners: {
                        change: {
                            fn: me.onTextFieldChange,
                            scope: this,
                            buffer: 500
                        }
                    }
                }],
                autoScroll: true,
                columnLines: true,
                store: me.employerStore,
                columns: {
                    items: [
                        { text: 'Seq', dataIndex: 'Seq', align: 'center', hidden: true },
                        { text: 'เลขประจำตัว', dataIndex: 'EMID', width: 130, align: 'center' },
                        { text: TextLabel.employerFullName, dataIndex: 'FullName', flex: 4 },
                        {
                            align: 'center',
                            xtype: 'actioncolumn',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'bind-employer-icon',
                                    tooltip: TextLabel.bindEmployer,
                                    scale: 'small',
                                    handler: function (grid, rowIndex, colIndex, item, event, record, row) {
                                        grid.getSelectionModel().select(record);

                                        var emid = record.get('EMID');
                                        Ext.MessageBox.wait("กำลังบันทึกข้อมูล...", 'กรุณารอ');
                                        Ext.Ajax.request({
                                            url: AppConfig.urlMasterApi + '/BindEmployer',
                                            method: 'POST',
                                            params: JSON.stringify({
                                                emid: emid
                                            }),
                                            success: function (transport) {
                                                Ext.MessageBox.hide();
                                                var response = Ext.decode(transport.responseText);
                                                if (response.success) {
                                                    me.myEmployerStore.load();
                                                    me.employerStore.load();
                                                    //Ext.MessageBox.show({
                                                    //    title: TextLabel.successTitle,
                                                    //    msg: TextLabel.successMsg,
                                                    //    //width: 300,
                                                    //    buttons: Ext.MessageBox.OK,
                                                    //    icon: Ext.MessageBox.INFO,
                                                    //    fn: function (btn) {
                                                    //        me.myEmployerStore.load();
                                                    //        me.employerStore.load();
                                                    //    }
                                                    //});
                                                } else {
                                                    Ext.MessageBox.show({
                                                        title: TextLabel.errorAlertTitle,
                                                        msg: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล <br/>' + response.message,
                                                        //width: 300,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                }
                                            },
                                            failure: function (transport) {
                                                Ext.MessageBox.hide();
                                                Ext.MessageBox.show({
                                                    title: TextLabel.errorAlertTitle,
                                                    msg: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล <br/>' + transport.responseText,
                                                    //width: 300,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                });
                                            },
                                            headers: { 'Content-Type': 'application/json' }
                                        });
                                    }
                                }
                            ]
                        }
                    ],
                    defaults: {
                        sortable: false,
                        menuDisabled: true,
                        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                            if (value) {
                                value = Ext.String.htmlEncode(value);
                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                            }
                            return value;
                        }
                    }
                },
                // paging bar on the bottom
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: me.employerStore,
                    displayInfo: true,
                    displayMsg: TextLabel.employer + ' แสดงอยู่ {0} - {1} จาก {2}',
                    emptyMsg: "ไม่มี " + TextLabel.employer
                })
            },
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                split: 5,
                items: [
                    {
                        title: 'นายจ้างที่เลือกแสดง',
                        xtype: 'gridpanel',
                        region: 'north',
                        height: '60%',
                        columnLines: true,
                        store: me.myEmployerStore,
                        columns: {
                            items: [
                                { text: 'Seq', dataIndex: 'Seq', align: 'center', hidden: true },
                                {
                                    align: 'center',
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'unbind-employer-icon',
                                        tooltip: TextLabel.unbindEmployer,
                                        scale: 'small',
                                        handler: function (grid, rowIndex, colIndex, item, event, record, row) {
                                            grid.getSelectionModel().select(record);

                                            var emid = record.get('EMID');
                                            Ext.MessageBox.wait("กำลังบันทึกข้อมูล...", 'กรุณารอ');
                                            Ext.Ajax.request({
                                                url: AppConfig.urlMasterApi + '/UnbindEmployer',
                                                method: 'POST',
                                                params: JSON.stringify({
                                                    emid: emid
                                                }),
                                                success: function (transport) {
                                                    Ext.MessageBox.hide();
                                                    var response = Ext.decode(transport.responseText);
                                                    if (response.success) {
                                                        me.myEmployerStore.load();
                                                        me.employerStore.load();
                                                        //Ext.MessageBox.show({
                                                        //    title: TextLabel.successTitle,
                                                        //    msg: TextLabel.successMsg,
                                                        //    //width: 300,
                                                        //    buttons: Ext.MessageBox.OK,
                                                        //    icon: Ext.MessageBox.INFO,
                                                        //    fn: function (btn) {
                                                        //        me.myEmployerStore.load();
                                                        //        me.employerStore.load();
                                                        //    }
                                                        //});
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: TextLabel.errorAlertTitle,
                                                            msg: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล <br/>' + response.message,
                                                            //width: 300,
                                                            buttons: Ext.MessageBox.OK,
                                                            icon: Ext.MessageBox.ERROR
                                                        });
                                                    }
                                                },
                                                failure: function (response, opts) {
                                                    Ext.MessageBox.hide();

                                                    Ext.MessageBox.show({
                                                        title: TextLabel.errorAlertTitle,
                                                        msg: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล <br/>' + response.responseText,
                                                        //width: 300,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                },
                                                headers: { 'Content-Type': 'application/json' }
                                            });
                                        }
                                    }
                                    ]
                                },
                                { text: 'เลขประจำตัว', dataIndex: 'EMID', width: 130, align: 'center' },
                                { text: TextLabel.employerFullName, dataIndex: 'FullName', flex: 4 }
                            ],
                            defaults: {
                                sortable: false,
                                menuDisabled: true,
                                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                                    if (value) {
                                        value = Ext.String.htmlEncode(value);
                                        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                    }
                                    return value;
                                }
                            }
                        },
                        // paging bar on the bottom
                        bbar: Ext.create('Ext.PagingToolbar', {
                            store: me.myEmployerStore,
                            displayInfo: true,
                            displayMsg: TextLabel.employer + ' แสดงอยู่ {0} - {1} จาก {2}',
                            emptyMsg: "ไม่มี " + TextLabel.employer
                        }),
                        listeners: {
                            itemclick: function (grd, record, item, index, e, eOpts) {
                                //console.log(selected);
                                var emid = record.get('EMID');

                                me.employerWorkplaceStore.proxy.extraParams.emid = emid;
                                me.employerWorkplaceStore.load();
                            }
                        }
                    },
                    {
                        title: 'สถานที่ทำงานของนายจ้าง',
                        xtype: 'gridpanel',
                        region: 'center',
                        columnLines: true,
                        height: '40%',
                        store: me.employerWorkplaceStore,
                        disableSelection: true,
                        columns: {
                            items: [
                                { text: 'EWID', dataIndex: 'EWID', align: 'center', hidden: true },
                                {
                                    align: 'center',
                                    xtype: 'actioncolumn',
                                    width: 65,
                                    items: [
                                        {
                                            xtype: 'button',
                                            iconCls: 'up-icon',
                                            tooltip: TextLabel.upTitle,
                                            isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                //return false;
                                                var order = record.get('Order');
                                                //console.log(order);
                                                if (order == 1) {
                                                    return true;
                                                }
                                                return false;
                                            },
                                            handler: function (grid, rowIndex, colIndex, item, event, record, row) {
                                                //grid.getSelectionModel().select(record);
                                                grid.setLoading(true);
                                                var ewid = parseInt(record.get('EWID'));
                                                //Ext.MessageBox.wait("กำลังบันทึกข้อมูล...", 'กรุณารอ');
                                                Ext.Ajax.request({
                                                    url: AppConfig.urlMasterApi + '/UpEmployerWorkplace',
                                                    method: 'POST',
                                                    params: JSON.stringify({
                                                        ewid: ewid
                                                    }),
                                                    success: function (transport) {
                                                        grid.setLoading(false);
                                                        var response = Ext.decode(transport.responseText);
                                                        if (response.success) {
                                                            me.employerWorkplaceStore.load();
                                                        } else {
                                                            Ext.MessageBox.show({
                                                                title: TextLabel.errorAlertTitle,
                                                                msg: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล <br/>' + response.message,
                                                                //width: 300,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.ERROR
                                                            });
                                                        }
                                                    },
                                                    failure: function (response, opts) {
                                                        grid.setLoading(false);
                                                    },
                                                    headers: { 'Content-Type': 'application/json' }
                                                });

                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'down-icon',
                                            tooltip: TextLabel.downTitle,
                                            isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                //return false;
                                                var order = record.get('Order');
                                                //console.log(order);
                                                if (me.employerWorkplaceStore.getCount() == 1) {
                                                    return true;
                                                }
                                                if (me.employerWorkplaceStore.getCount() == order) {
                                                    return true;
                                                }
                                                return false;
                                            },
                                            handler: function (grid, rowIndex, colIndex, item, event, record, row) {
                                                //grid.getSelectionModel().select(record);
                                                grid.setLoading(true);
                                                var ewid = parseInt(record.get('EWID'));
                                                //Ext.MessageBox.wait("กำลังบันทึกข้อมูล...", 'กรุณารอ');
                                                Ext.Ajax.request({
                                                    url: AppConfig.urlMasterApi + '/DownEmployerWorkplace',
                                                    method: 'POST',
                                                    params: JSON.stringify({
                                                        ewid: ewid
                                                    }),
                                                    success: function (transport) {
                                                        grid.setLoading(false);
                                                        var response = Ext.decode(transport.responseText);
                                                        if (response.success) {
                                                            me.employerWorkplaceStore.load();
                                                        } else {
                                                            Ext.MessageBox.show({
                                                                title: TextLabel.errorAlertTitle,
                                                                msg: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล <br/>' + response.message,
                                                                //width: 300,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.ERROR
                                                            });
                                                        }
                                                    },
                                                    failure: function (response, opts) {
                                                        grid.setLoading(false);
                                                    },
                                                    headers: { 'Content-Type': 'application/json' }
                                                });
                                            }
                                        }
                                    ]
                                },
                                { text: 'ลำดับ', dataIndex: 'Order', align: 'center', width: 80 },
                                { text: 'ที่อยู่', dataIndex: 'Address', flex: 1 }
                            ],
                            defaults: {
                                sortable: false,
                                menuDisabled: true,
                                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                                    if (value) {
                                        value = Ext.String.htmlEncode(value);
                                        metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                    }
                                    return value;
                                }
                            }
                        },
                        // paging bar on the bottom
                        bbar: Ext.create('Ext.PagingToolbar', {
                            store: me.employerWorkplaceStore,
                            displayInfo: true,
                            displayMsg: TextLabel.employerWorkplace + ' แสดงอยู่ {0} - {1} จาก {2}',
                            emptyMsg: "ไม่มี " + TextLabel.employerWorkplace
                        })
                    }
                ]
            }]
        });

        me.callParent(arguments);
    }

});