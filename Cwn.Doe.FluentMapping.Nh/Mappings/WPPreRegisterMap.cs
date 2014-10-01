using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class WPPreRegisterMap
        : ClassMap<WPPreRegister>
    {
        public WPPreRegisterMap()
        {
            Table("MST_PRE_REGISTER");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.BarcodeID, "BARCODE_ID");
            Map(t => t.WPCitizenID, "WP_CITIZEN_ID");
            Map(t => t.PrefixSeq, "PREFIX_SEQ");
            Map(t => t.WPTName, "WP_TNAME");
            Map(t => t.WPName, "WP_NAME");
            Map(t => t.WPMName, "WP_MNAME");
            Map(t => t.WPSName, "WP_SNAME");
            Map(t => t.WPTNameEN, "WP_TNAME_EN");
            Map(t => t.WPNameEN, "WP_NAME_EN");
            Map(t => t.WPMNameEN, "WP_MNAME_EN");
            Map(t => t.WPSNameEN, "WP_SNAME_EN");
            Map(t => t.WPNation, "WP_NATION");
            Map(t => t.WPBDate, "WP_BDATE");
            Map(t => t.WPAge, "WP_AGE");
            Map(t => t.WPSex, "WP_SEX");
            Map(t => t.WPBloodGp, "WP_BLOOD_GP");
            Map(t => t.WPAddrAbd, "WP_ADDR_ABD");
            Map(t => t.WPCountryAbd, "WP_COUNTRY_ABD");
            Map(t => t.WPPCodeAbd, "WP_PCODE_ABD");
            Map(t => t.WPHouse, "WP_HOUSE");
            Map(t => t.WPMoo, "WP_MOO");
            Map(t => t.WPBuilding, "WP_BUILDING");
            Map(t => t.WPTrok, "WP_TROK");
            Map(t => t.WPSoi, "WP_SOI");
            Map(t => t.WPRoad, "WP_ROAD");
            Map(t => t.WPTamb, "WP_TAMB");
            Map(t => t.WPAmp, "WP_AMP");
            Map(t => t.WPProv, "WP_PROV");
            Map(t => t.WPPost, "WP_POST");
            Map(t => t.WPTel, "WP_TEL");
            Map(t => t.WPFax, "WP_FAX");
            Map(t => t.WPMobile, "WP_MOBILE");

            Map(t => t.WPPassportFlag, "WP_PASSPORT_FLAG");
            Map(t => t.WPRepresentPassport, "WP_REPRESENT_PASSPORT");
            Map(t => t.WPPassportNO, "WP_PASSPORT_NO");
            Map(t => t.WPPassportIssueAT, "WP_PASSPORT_ISSUE_AT");
            Map(t => t.WPPassportCountry, "WP_PASSPORT_COUNTRY");
            Map(t => t.WPPassportIssueDate, "WP_PASSPORT_ISSUE_DATE");
            Map(t => t.WPPassportExpireDate, "WP_PASSPORT_EXPIRE_DATE");

            Map(t => t.WPVisaType, "WP_VISA_TYPE");
            Map(t => t.WPVisaNO, "WP_VISA_NO");
            Map(t => t.WPVisaIssueAT, "WP_VISA_ISSUE_AT");
            Map(t => t.WPVisaIssueDate, "WP_VISA_ISSUE_DATE");
            Map(t => t.WPVisaExpireDate, "WP_VISA_EXPIRE_DATE");
            Map(t => t.WPArrivalDate, "WP_ARRIVAL_DATE");
            Map(t => t.WPImmiCheckpoint, "WP_IMMI_CHECKPOINT");
            Map(t => t.WPStayableDate, "WP_STAYABLE_DATE");
            Map(t => t.WIFlag, "WI_FLAG");
            Map(t => t.WPIDST, "WP_ID_ST");
            Map(t => t.BookIssueProvST, "BOOK_ISSUE_PROV_ST");
            Map(t => t.WPIDND, "WP_ID_ND");
            Map(t => t.WPVersionNO, "WP_VERSION_NO");
            Map(t => t.WPStatus, "WP_STATUS");
            Map(t => t.BookFlag, "BOOK_FLAG");
            Map(t => t.BookIssueProvND, "BOOK_ISSUE_PROV_ND");
            Map(t => t.BookIssueDateND, "BOOK_ISSUE_DATE_ND");
            Map(t => t.BookExpireDateND, "BOOK_EXPIRE_DATE_ND");
            Map(t => t.RGType, "RG_TYPE");
            Map(t => t.RGWorkType, "RG_WORK_TYPE");
            Map(t => t.RGWorkDetail, "RG_WORK_DETAIL");
            Map(t => t.OccupationSeq, "OCCUPATION_SEQ");

            Map(t => t.EMID, "EM_ID");
            Map(t => t.EMIDVerNO, "EM_ID_VER_NO");
            Map(t => t.EWID, "EW_ID");
            Map(t => t.EWIDVerNO, "EW_ID_VER_NO");
            Map(t => t.EWID2, "EW_ID2");
            Map(t => t.EWID2VerNO, "EW_ID2_VER_NO");
            Map(t => t.EWID3, "EW_ID3");
            Map(t => t.EWID3VerNO, "EW_ID3_VER_NO");
            Map(t => t.EWID4, "EW_ID4");
            Map(t => t.EWID4VerNO, "EW_ID4_VER_NO");

            Map(t => t.DistrictCode, "DISTRICT_CODE");
            Map(t => t.AlienType, "ALIEN_TYPE");

            Map(t => t.RDCopyPassport, "RD_COPY_PASSPORT");
            Map(t => t.RDCopyLieuPassport, "RD_COPY_LIEU_PASSPORT");
            Map(t => t.RDCopyEvidence, "RD_COPY_EVIDENCE");
            Map(t => t.RDNotHireTH, "RD_NOT_HIRE_TH");
            Map(t => t.RDCidTH, "RD_CID_TH");
            Map(t => t.RDCpp, "RD_CPP");
            Map(t => t.RDCcerBfp, "RD_CCER_BFP");
            Map(t => t.RDCerMed, "RD_CER_MED");
            Map(t => t.RDPhoto3X4, "RD_PHOTO_3X4");
            Map(t => t.RDMapLocWP, "RD_MAP_LOC_WP");
            Map(t => t.RDWPDoc, "RD_WP_DOC");
            Map(t => t.SDDamageWP, "SD_DAMAGE_WP");
            Map(t => t.SDPoliceDR, "SD_POLICE_DR");
            Map(t => t.SDPhoto3X4, "SD_PHOTO_3X4");

            Map(t => t.CreateDate, "CREATE_DATE");
            Map(t => t.CreateBY, "CREATE_BY");
            Version(t => t.LastUpdate).Column("LAST_UPDATE");
            Map(t => t.LastUpdateBY, "LAST_UPDATE_BY");

        }
    }
}
