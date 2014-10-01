Ext.define(AppConfig.appName + '.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        var authorizeControl = {};
        var headers = [];
        headers.push({
            region: 'west',
            width: 600,
            bodyStyle: "background-image:url(" + AppConfig.urlContent + "/images/Header01.jpg);background-repeat:no-repeat; !important;"
        });
        if (LoginToken.isAuthenticated) {
            var authorizePanels = [];
            
            authorizePanels.push(Ext.create('widget.formwp2panel', { title: 'แบบ ตท. ๒ <br/> Form WP. 2' }));
            authorizePanels.push(Ext.create('widget.employerworkplacemanagmentpanel', { title: 'การจัดการนายจ้าง' }));

            authorizeControl = Ext.create(
                'widget.tabpanel',
                {
                    region: 'center',
                    activeTab: 0,
                    items: authorizePanels
                }
            );

            headers.push({
                xtype: 'panel',
                region: 'center',
                width: 400,
                bodyStyle: "background-image:url(" + AppConfig.urlContent + "/images/userbar.jpg);background-repeat:no-repeat; !important;",
                tbar: ['->', {
                    xtype: 'tbtext',
                    text: '<i class="glyphicon glyphicon-user"></i>: ' + LoginToken.userName
                }, '-', {
                    xtype: 'tbtext',
                    text: '<strong>Role</strong>: ' + LoginToken.roles
                }, {
                    xtype: 'tbtext',
                    text: "<button id='cmdLogOff' class='btn btn-danger'><i class='glyphicon glyphicon-log-out'></i>&nbsp;ออกจากระบบ</button>"
                }]
            });

        } else {
            authorizeControl = Ext.create('widget.panel',
            {
                region: 'center',
                layout: {
                    type: 'vbox',
                    align: 'right'
                },
                margin: '0 0 0 0',
                bodyStyle: "background-image:url(" + AppConfig.urlContent + "/images/Login.jpg);background-repeat:no-repeat; !important;",
                items: [{
                    xtype: 'form',
                    margin: '5 5 5 290',
                    items: [{
                        xtype: 'fieldset',
                        title: 'กรุณาระบุข้อมูล',
                        defaultType: 'textfield',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        fieldDefaults: {
                            allowBlank: false,
                            width: 300
                        },
                        margin: '5 5 5 5',
                        items: [{
                            id: 'login-username',
                            xtype: 'textfield',
                            name: 'UserName',
                            fieldLabel: '',
                            emptyText: 'ชื่อผู้ใช้',
                            inputAttrTpl: [
                                "autocomplete=\"on\""
                            ],
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
                                        doLogin(field, e);
                                    }
                                }
                            }
                        }, {
                            id: 'login-password',
                            name: 'Password',
                            fieldLabel: '',
                            emptyText: 'รหัสเข้าระบบ',
                            inputType: 'password',
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == e.ENTER) {
                                        doLogin(field, e);
                                    }
                                }
                            }
                        }, {
                            xtype: 'button',
                            iconCls: 'login-icon',
                            text: 'เข้าระบบ',
                            margin: '5 0 5 0',
                            handler: function (widget, event) {
                                doLogin(widget, event);
                            }
                        }
                        //, {
                        //    xtype: 'button',
                        //    iconCls: 'regis-icon',
                        //    cls: 'regis-command',
                        //    text: 'สมัครสมาชิกใหม่',
                        //    margin: '5 0 5 0',
                        //    handler: function (widget, event) {

                        //    }
                        //}
                        ]
                    }]
                }]
            });

            headers.push({
                xtype: 'panel',
                region: 'center',
                width: 400,
                bodyStyle: "background-image:url(" + AppConfig.urlContent + "/images/userbar-2.jpg);background-repeat:no-repeat; !important;"
            });
        }
        
        var doLogin = function (widget, event) {
            event.stopEvent();

            var from = widget.up('form');

            var loginModel = {
                UserName: Ext.getCmp('login-username').getValue(),
                Password: Ext.getCmp('login-password').getValue()
            };

            if (!from.isValid()) {
                Ext.MessageBox.show({
                    title: TextLabel.validationTitle,
                    msg: TextLabel.validationWarning,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (btn) {
                        if (loginModel.UserName === "") {
                            Ext.getCmp('login-username').focus(false, 200);
                        }
                        else if (loginModel.Password === "") {
                            Ext.getCmp('login-password').focus(false, 200);
                        }

                    }
                });

                return false;
            }
            from.setLoading('กำลังเข้าระบบ...');
            from.submit({
                url: AppConfig.urlMainApi + '/Login',
                success: function (form, action) {
                    from.setLoading(false);
                    window.location.href = AppConfig.urlMainApi;
                },
                failure: function (form, action) {
                    from.setLoading(false);
                    var respose = Ext.decode(action.response.responseText);

                    Ext.MessageBox.show({
                        title: TextLabel.errorAlertTitle,
                        msg: 'การเข้าระบบล้มเหลว ' + respose.message,
                        //width: 300,
                        buttons: Ext.MessageBox.OK,
                        //animateTarget: from,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        };

        Ext.apply(me, {
            xtype: 'panel',
            layout: 'border',
            items: [{
                xtype: 'panel',
                layout: 'border',
                region: 'north',
                height: 110,
                //bodyStyle: "background-image:url(./Content/images/Header01.jpg);background-repeat:no-repeat; !important;",
                items: headers
            },
            authorizeControl]
        });

        me.callParent(arguments);
    },

    onTextFieldChange: function (txt, newValue, oldValue, eOpts) {
        var me = this;
        //console.log(newValue);
        me.employerStore.currentPage = 1;

        me.employerStore.proxy.extraParams.emName = newValue;
        me.employerStore.load();
    },

    listeners: {
        afterrender: function (vPort, eOpts) {
            $('#cmdLogOff').click(function (e) {
                vPort.setLoading('กำลังออกจากระบบ...');
                $.post(AppConfig.urlMainApi + '/LogOff', function () {
                    window.location.href = AppConfig.urlDefault;
                }).fail(function () {
                    Ext.MessageBox.show({
                        title: TextLabel.errorAlertTitle,
                        msg: 'เกิดข้อผิดพลาดในขั้นตอนเชื่อต่อระบบ',
                        //width: 300,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (btn) {
                            window.location.href = AppConfig.urlDefault;
                        }
                    });

                });
            });
        }
    }
});