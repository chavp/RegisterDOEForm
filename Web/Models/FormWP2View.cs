using Cwn.Doe.BusinessModels.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace DoeWeb.Models
{
    public class FormWP2View
    {
        public FormWP2View()
        {
        }

        public FormWP2View(
            WPPreRegister n, Employer em, 
            EmployerWorkplace ew,
            string nationName, string wpCountryAbdTH,
            string wpProvName, string wpAmpName, string wpTambName,
            string bookIssueProvNDName, string rgWorkTypeName, string occupation,
            string emProvName, string emAmpName, string emTambName,
            string ewProvName, string ewAmpName, string ewTambName)
        {
            var emFullName = (em != null) ? string.Format("{0} {1} {2}", em.EMTName, em.EMName, em.EMSName) : string.Empty;

            Seq = n.Seq;
            Version = n.WPVersionNO.GetValueOrDefault();
            WPStatus = n.WPStatus;
            CitizenID = n.WPCitizenID;
            BarcodeID = n.BarcodeID;

            WPTName = n.WPTName;
            WPTNameEN = n.WPTNameEN;
            WPName = n.WPName;
            WPNameEN = n.WPNameEN;
            WPMName = n.WPMName;
            WPMNameEN = n.WPMNameEN;
            WPSName = n.WPSName;
            WPSNameEN = n.WPSNameEN;
            AlienFullName = n.WPName + " " + n.WPSName;
            AlienFullNameEN = n.WPNameEN + " " + n.WPSNameEN;

            WPBDate = n.WPBDate;
            WPSex = n.WPSex;
            WPNation = n.WPNation;
            WPNationName = nationName;

            WPAge = n.WPAge;
            WPBloodGp = n.WPBloodGp;
            WPAddrAbd = n.WPAddrAbd;

            WPCountryAbd = n.WPCountryAbd;
            WPCountryAbdTH = wpCountryAbdTH;

            WPPCodeAbd = n.WPPCodeAbd;

            WPHouse = n.WPHouse;
            WPMoo = n.WPMoo;
            WPTrok = n.WPTrok;
            WPSoi = n.WPSoi;
            WPRoad = n.WPRoad;
            WPBuilding = n.WPBuilding;

            WPProv = n.WPProv;
            WPProvName = wpProvName;
            WPAmp = n.WPAmp;
            WPAmpName = wpAmpName;
            WPTamb = n.WPTamb;
            WPTambName = wpTambName;

            WPPost = n.WPPost;

            WPTel = n.WPTel;
            WPFax = n.WPFax;
            WPMobile = n.WPMobile;

            // 1.4 ----------------------------------------
            WPPassportFlag = n.WPPassportFlag;
            WPPassportNO = n.WPPassportNO;
            WPPassportIssueAT = n.WPPassportIssueAT;
            WPPassportCountry = n.WPPassportCountry;
            WPPassportExpireDate = n.WPPassportExpireDate;
            WPPassportIssueDate = n.WPPassportIssueDate;

            // 1.5 ----------------------------------------
            WPVisaType = n.WPVisaType;
            WPVisaNO = n.WPVisaNO;
            WPVisaIssueAT = n.WPVisaIssueAT;
            WPVisaIssueDate = n.WPVisaIssueDate;
            WPVisaExpireDate = n.WPVisaExpireDate;
            WPArrivalDate = n.WPArrivalDate;
            WPImmiCheckpoint = n.WPImmiCheckpoint;
            WPStayableDate = n.WPStayableDate;

            // 2.1 ----------------------------------------------
            WIFlag = n.WIFlag;
            WPIDST = n.WPIDST;
            BookIssueProvST = n.BookIssueProvST;
            // 2.2 ----------------------------------------------
            BookFlag = n.BookFlag;
            WPIDND = n.WPIDND;
            BookIssueDateND = n.BookIssueDateND;
            BookIssueProvND = n.BookIssueProvND;
            BookIssueProvNDName = bookIssueProvNDName;
            BookExpireDateND = n.BookExpireDateND;

            // 3.1 ----------------------------------------------
            RGType = n.RGType;
            RGWorkType = n.RGWorkType;
            RGWorkTypeName = rgWorkTypeName;
            RGWorkDetail = n.RGWorkDetail;
            OccupationSeq = n.OccupationSeq;
            Occupation = occupation;
            DistrictCode = n.DistrictCode;

            EMID = n.EMID;
            EMFullName = emFullName;
            EMIDVerNO = n.EMIDVerNO;
            if (em != null)
            {
                EM_HOUSE = em.EMHouse;
                EM_MOO = em.EMMoo;
                EM_BUILDING = em.EMBuilding;
                EM_SOI = em.EMSoi;
                EM_ROAD = em.EMRoad;

                EM_TAMB = em.EMTamb;
                EM_TAMB_NAME = emTambName;
                EM_AMP = em.EMAmp;
                EM_AMP_NAME = emAmpName;
                EM_PROV = em.EMProv;
                EM_PROV_NAME = emProvName;

                EM_POST = em.EMPost;
                EM_TEL = em.EMTel;
                EM_FAX = em.EMFax;
                EM_MOBILE = em.EMMobile;
            }

            EWID = n.EWID;
            EWIDVerNO = n.EWIDVerNO;
            if (ew != null)
            {
                EW_HOUSE = ew.EWHouse;
                EW_MOO = ew.EWMoo;
                EW_BUILDING = ew.EWBuilding;
                EW_SOI = ew.EWSoi;
                EW_ROAD = ew.EWRoad;
                EW_TAMB = ew.EWTamb;
                EW_TAMB_NAME = ewTambName;
                EW_AMP = ew.EWAmp;
                EW_AMP_NAME = ewAmpName;
                EW_PROV = ew.EWProv;
                EW_PROV_NAME = ewProvName;
                EW_POST = ew.EWPost;
                EW_TEL = ew.EWTel;
                EW_FAX = ew.EWFax;
                EW_MOBILE = ew.EWMobile;
            }

            EWID2 = n.EWID2;
            EWID2VerNO = n.EWID2VerNO;
            EWID3 = n.EWID3;
            EWID3VerNO = n.EWID3VerNO;
            EWID4 = n.EWID4;
            EWID4VerNO = n.EWID4VerNO;
            EWID5 = n.EWID4;
            EWID5VerNO = n.EWID4VerNO;
            EWID6 = n.EWID4;
            EWID6VerNO = n.EWID4VerNO;
            EWID7 = n.EWID4;
            EWID7VerNO = n.EWID4VerNO;
            EWID8 = n.EWID4;
            EWID8VerNO = n.EWID4VerNO;
            EWID9 = n.EWID4;
            EWID9VerNO = n.EWID4VerNO;
        }

        public long Seq { get; set; }
        public int Version { get; set; }
        public long PreRegisterSurveySeq { get; set; }
        public string BarcodeID { get; set; }

        public string WPTName { get; set; }
        public string WPTNameEN { get; set; }
        public string WPName { get; set; }
        public string WPNameEN { get; set; }
        public string WPMName { get; set; }
        public string WPMNameEN { get; set; }
        public string WPSName { get; set; }
        public string WPSNameEN { get; set; }
        public string AlienFullName { get; set; }
        public string AlienFullNameEN { get; set; }
        public string CitizenID { get; set; }
        public string WPStatus { get; set; }
        public string WPSex { get; set; }
        public string WPNation { get; set; }
        public string WPNationName { get; set; }
        public string WPBDateYear { get; set; }
        public string WPBDateMonth { get; set; }
        public string WPBDateDay { get; set; }

        DateTime? _WPBDate;
        public DateTime? WPBDate 
        {
            get
            {
                if (!string.IsNullOrEmpty(WPBDateYear)
                    && !string.IsNullOrEmpty(WPBDateMonth)
                    && !string.IsNullOrEmpty(WPBDateDay))
                {
                    int year = int.Parse(WPBDateYear);
                    int month = int.Parse(WPBDateMonth);
                    int day = int.Parse(WPBDateDay);
                    DateTime bd = new DateTime(year, month, day);
                    return bd;
                }

                return null;
            }
            set 
            {
                if (value.HasValue)
                {
                    _WPBDate = value;

                    WPBDateYear = value.Value.ToString("yyyy", new CultureInfo("en-US"));
                    WPBDateMonth = value.Value.ToString("MM");
                    WPBDateDay = value.Value.ToString("dd");
                }
            } 
        }

        public string WPAge { get; set; }
        public string WPBloodGp { get; set; }
        public string WPAddrAbd { get; set; }
        public string WPCountryAbd { get; set; }
        public string WPCountryAbdTH { get; set; }
        public string WPPCodeAbd { get; set; }
        public string WPHouse { get; set; }
        public string WPMoo { get; set; }
        public string WPTrok { get; set; }
        public string WPSoi { get; set; }
        public string WPRoad { get; set; }
        public string WPBuilding { get; set; }

        public string WPProv { get; set; }
        public string WPProvName { get; set; }
        public string WPAmp { get; set; }
        public string WPAmpName { get; set; }
        public string WPTamb { get; set; }
        public string WPTambName { get; set; }

        public string WPPost { get; set; }
        public string WPTel { get; set; }
        public string WPFax { get; set; }
        public string WPMobile { get; set; }

        // 1.4 ----------------------------------------------
        public string WPPassportFlag { get; set; }
        public string WPPassportNO { get; set; }
        public string WPPassportIssueAT { get; set; }
        public string WPPassportCountry { get; set; }
        public DateTime? WPPassportIssueDate { get; set; }
        public DateTime? WPPassportExpireDate { get; set; }

        // 1.5 ----------------------------------------------
        public string WPVisaType { get; set; }
        public string WPVisaNO { get; set; }
        public string WPVisaIssueAT { get; set; }
        public DateTime? WPVisaIssueDate { get; set; }
        public DateTime? WPVisaExpireDate { get; set; }
        public DateTime? WPArrivalDate { get; set; }
        public string WPImmiCheckpoint { get; set; }
        public DateTime? WPStayableDate { get; set; }

        // 2.1 ----------------------------------------------
        public string WIFlag { get; set; }
        public string WPIDST { get; set; }
        public string BookIssueProvST { get; set; }
        // 2.2 ----------------------------------------------
        public string BookFlag { get; set; }
        public string WPIDND { get; set; }
        public DateTime? BookIssueDateND { get; set; }
        public string BookIssueProvND { get; set; }
        public string BookIssueProvNDName { get; set; }
        public DateTime? BookExpireDateND { get; set; }

        // 3.1 ----------------------------------------------
        public string RGType { get; set; }
        public string RGWorkType { get; set; }
        public string RGWorkTypeName { get; set; }
        public string RGWorkDetail { get; set; }
        public string OccupationSeq { get; set; }
        public string Occupation { get; set; }

        public string DistrictCode { get; set; }

        public string EMID { get; set; }
        public string EMFullName { get; set; }
        public int? EMIDVerNO { get; set; }
        public string EM_HOUSE { get; set; }
        public string EM_MOO { get; set; }
        public string EM_BUILDING { get; set; }
        public string EM_SOI { get; set; }
        public string EM_ROAD { get; set; }

        public string EM_TAMB { get; set; }
        public string EM_TAMB_NAME { get; set; }
        public string EM_AMP { get; set; }
        public string EM_AMP_NAME { get; set; }
        public string EM_PROV { get; set; }
        public string EM_PROV_NAME { get; set; }

        public string EM_POST { get; set; }
        public string EM_TEL { get; set; }
        public string EM_FAX { get; set; }
        public string EM_MOBILE { get; set; }

        public decimal? EWID { get; set; }
        public decimal? EWIDVerNO { get; set; }
        public string EW_HOUSE { get; set; }
        public string EW_MOO { get; set; }
        public string EW_SOI { get; set; }
        public string EW_BUILDING { get; set; }
        public string EW_ROAD { get; set; }
        public string EW_TAMB { get; set; }
        public string EW_TAMB_NAME { get; set; }
        public string EW_AMP { get; set; }
        public string EW_AMP_NAME { get; set; }
        public string EW_PROV { get; set; }
        public string EW_PROV_NAME { get; set; }
        public string EW_POST { get; set; }
        public string EW_TEL { get; set; }
        public string EW_FAX { get; set; }
        public string EW_MOBILE { get; set; }

        public decimal? EWID2 { get; set; }
        public decimal? EWID2VerNO { get; set; }
        public decimal? EWID3 { get; set; }
        public decimal? EWID3VerNO { get; set; }
        public decimal? EWID4 { get; set; }
        public decimal? EWID4VerNO { get; set; }
        public decimal? EWID5 { get; set; }
        public decimal? EWID5VerNO { get; set; }
        public decimal? EWID6 { get; set; }
        public decimal? EWID6VerNO { get; set; }
        public decimal? EWID7 { get; set; }
        public decimal? EWID7VerNO { get; set; }
        public decimal? EWID8 { get; set; }
        public decimal? EWID8VerNO { get; set; }
        public decimal? EWID9 { get; set; }
        public decimal? EWID9VerNO { get; set; }

        public void CopyAllFieldTo(WPPreRegister wpPreRegister)
        {
            wpPreRegister.WPCitizenID = CitizenID;

            wpPreRegister.WPName = WPName;
            wpPreRegister.WPNameEN = WPNameEN;
            wpPreRegister.WPTName = WPTName;
            wpPreRegister.WPTNameEN = WPTNameEN;
            wpPreRegister.WPMName = WPMName;
            wpPreRegister.WPMNameEN = WPMNameEN;
            wpPreRegister.WPSName = WPSName;
            wpPreRegister.WPSNameEN = WPSNameEN;
            wpPreRegister.WPBDate = WPBDate;
            wpPreRegister.WPSex = WPSex;
            wpPreRegister.WPNation = WPNation;
            wpPreRegister.WPAge = WPAge;
            wpPreRegister.WPBloodGp = WPBloodGp;
            wpPreRegister.WPAddrAbd = WPAddrAbd;
            wpPreRegister.WPCountryAbd = WPCountryAbd;
            wpPreRegister.WPPCodeAbd = WPPCodeAbd;
            wpPreRegister.WPHouse = WPHouse;
            wpPreRegister.WPMoo = WPMoo;
            wpPreRegister.WPTrok = WPTrok;
            wpPreRegister.WPSoi = WPSoi;
            wpPreRegister.WPRoad = WPRoad;
            wpPreRegister.WPBuilding = WPBuilding;
            wpPreRegister.WPProv = WPProv;
            wpPreRegister.WPAmp = WPAmp;
            wpPreRegister.WPTamb = WPTamb;
            wpPreRegister.WPPost = WPPost;

            wpPreRegister.WPTel = WPTel;
            wpPreRegister.WPFax = WPFax;
            wpPreRegister.WPMobile = WPMobile;

            // 1.4 ----------------------------------------------------
            wpPreRegister.WPPassportFlag = WPPassportFlag;
            wpPreRegister.WPPassportNO = WPPassportNO;
            wpPreRegister.WPPassportIssueAT = WPPassportIssueAT;
            wpPreRegister.WPPassportCountry = WPPassportCountry;
            wpPreRegister.WPPassportIssueDate = WPPassportIssueDate;
            wpPreRegister.WPPassportExpireDate = WPPassportExpireDate;

            // 1.5 ----------------------------------------------------
            wpPreRegister.WPVisaType = WPVisaType;
            wpPreRegister.WPVisaNO = WPVisaNO;
            wpPreRegister.WPVisaIssueAT = WPVisaIssueAT;
            wpPreRegister.WPVisaIssueDate = WPVisaIssueDate;
            wpPreRegister.WPVisaExpireDate = WPVisaExpireDate;
            wpPreRegister.WPArrivalDate = WPArrivalDate;
            wpPreRegister.WPImmiCheckpoint = WPImmiCheckpoint;
            wpPreRegister.WPStayableDate = WPStayableDate;

            // 2.1 ----------------------------------------------
            wpPreRegister.WIFlag = WIFlag;
            wpPreRegister.WPIDST = WPIDST;
            wpPreRegister.BookIssueProvST = BookIssueProvST;
            // 2.2 ----------------------------------------------
            wpPreRegister.BookFlag = BookFlag;
            wpPreRegister.WPIDND = WPIDND;
            wpPreRegister.BookIssueDateND = BookIssueDateND;
            wpPreRegister.BookIssueProvND = BookIssueProvND;
            wpPreRegister.BookExpireDateND = BookExpireDateND;

            // 3.1 ----------------------------------------------
            wpPreRegister.RGType = RGType;
            wpPreRegister.RGWorkType = RGWorkType;
            wpPreRegister.RGWorkDetail = RGWorkDetail;
            wpPreRegister.OccupationSeq = OccupationSeq;
            wpPreRegister.DistrictCode = DistrictCode;

            wpPreRegister.EMID = EMID;
            wpPreRegister.EMIDVerNO = EMIDVerNO;
            wpPreRegister.EWID = EWID;
            wpPreRegister.EWIDVerNO = EWIDVerNO;
            wpPreRegister.EWID2 = EWID2;
            wpPreRegister.EWID2VerNO = EWID2VerNO;
            wpPreRegister.EWID3 = EWID3;
            wpPreRegister.EWID3VerNO = EWID3VerNO;
            wpPreRegister.EWID4 = EWID4;
            wpPreRegister.EWID4VerNO = EWID4VerNO;
            wpPreRegister.EWID5 = EWID5;
            wpPreRegister.EWID5VerNO = EWID5VerNO;
            wpPreRegister.EWID6 = EWID6;
            wpPreRegister.EWID6VerNO = EWID6VerNO;
            wpPreRegister.EWID7 = EWID7;
            wpPreRegister.EWID7VerNO = EWID7VerNO;
            wpPreRegister.EWID8 = EWID8;
            wpPreRegister.EWID8VerNO = EWID8VerNO;
            wpPreRegister.EWID9 = EWID9;
            wpPreRegister.EWID9VerNO = EWID9VerNO;
        }

        public void DefaultForm()
        {
            //1.2 ไม่เคยมีใบอนุญาต
            //WIFlag = "N";

            //3.1 
            RGType = "N";
        }
    }
}