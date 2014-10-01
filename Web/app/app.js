Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', AppConfig.scriptsFolderPath + '/ext-5.0.1/ux');

TextLabel = (function () {
    return {
        formWp2Name: 'คำขอรับใบอนุญาตทำงานตามมาตรา ๙',
        formWp2: 'แบบ ตท. ๒',
        alienFullName: 'ชื่อลูกจ้าง',
        formStatus: 'สถานะแบบฟอร์ม',
        citizenID: 'เลขประจำตัว',
        employerFullName: 'ชื่อนายจ้าง',
        employer: 'นายจ้าง',

        alienInformation: "1. ข้อมูลคนต่างด้าว <br/> Alien's Information",
        workInformation: "2. ข้อมูลการทำงาน <br/> Work Information",
        applicationInformation: "3. ข้อมูลการขออนุญาต <br/> Application Information",

        add: 'เพิ่ม',
        deleteCmdLabel: 'ลบข้อมูล',
        editCmdLabel: 'แก้ไขข้อมูล',
        successTitle: 'สำเร็จ',
        bindEmployer: 'เลือก',
        unbindEmployer: 'เอาออก',
        employerWorkplace: 'สถานที่ทำงานของนายจ้าง',
        printSucessText: 'สร้างรายงาน แบบ ตท. ๒ เสร็จสมบูรณ์',

        validationTitle: 'ผลการตรวจสอบข้อมูล',
        validationAddProjectMember: 'กรุณากำหนด หน้าที่ในโครงการ ให้สมบูรณ์',
        errorAlertTitle: 'ข้อผิดพลาด',
        validationWarning: 'กรุณากรอกข้อมูลให้สมบูรณ์',
        successTitle: 'สำเร็จ',
        successMsg: 'บันทึกข้อมูลเสร็จสมบูรณ์',

        upTitle: 'เลื่อนลำดับ',
        downTitle: 'ลดลำดับ',
        fairTitle: '',
        preRegisterSurveyTitle: 'กรุณากรอกแบบสอบถาม',

        requireInputEmptyText: 'กรุณาระบุข้อมูล',
        requireSelectEmptyText: 'กรุณาเลือก'
    }
})();

Ext.application({
    name: AppConfig.appName,
    appFolder: AppConfig.appFolderPath,
    autoCreateViewport: true,

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.form.*',
        'Ext.tip.QuickTipManager',
        'Ext.data.*',
        'Ext.ux.CheckColumn',
        'Ext.window.MessageBox',
        'Ext.tip.*',
        'Ext.ux.form.SearchField',
        AppConfig.appName + '.view.formWP2.FormWP2Window',
        AppConfig.appName + '.view.formWP2.MainFormWP2Panel',
        AppConfig.appName + '.view.formWP2.AlienInformationPanel',
        AppConfig.appName + '.view.formWP2.WorkInformationPanel',
        AppConfig.appName + '.view.formWP2.ApplicationInformationPanel',
        AppConfig.appName + '.view.formWP2.WorkPlaceAddressPanel',
        AppConfig.appName + '.view.formWP2.FormWP2Panel',
        AppConfig.appName + '.view.formWP2.EmployerWorkplaceManagmentPanel',
        AppConfig.appName + '.view.formWP2.PreRegisterSurveyWindow'
    ],

    stores: [
        'TitleArrayStore',
        'NationalityStore',
        'CountryStore',
        'ProvinceStore',
        'AmphurStore',
        'TambolStore',
        'VisatypeStore',
        'OccupationStore',
        'BUCategoryStore',
        'BUTypeStore',
        'FormWP2Store',
        'EmployerStore',
        'EmployerWorkplaceStore',
        'UnitsStore'
    ],

    models: [
        'TitleName',
        'Nationality',
        'Country',
        'Province',
        'Amphur',
        'Tambol',
        'Visatype',
        'Occupation',
        'BUCategory',
        'FormWP2',
        'Employer',
        'EmployerWorkplace',
        'Units',
        'PreRegisterSurvey'
    ],

    init: function () {

    }
});