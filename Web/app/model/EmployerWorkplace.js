Ext.define(AppConfig.appName + '.model.EmployerWorkplace', {
    extend: 'Ext.data.Model',
    xtype: 'employerworkplace',
    idProperty: 'EWID',
    fields: [
        { name: 'EWID' },
        { name: 'EMID', type: 'string' },
        { name: 'Order' },
        { name: 'EWHouse', type: 'string' },
        { name: 'EWBuilding', type: 'string' },
        { name: 'EWMoo', type: 'string' },
        { name: 'EWSoi', type: 'string' },
        { name: 'EWRoad', type: 'string' },
        { name: 'EWProvName', type: 'string' },
        { name: 'EWAmpName', type: 'string' },
        { name: 'EWTambName', type: 'string' },
        { name: 'EWPost', type: 'string' },
        { name: 'Address', type: 'string' }
    ]
});