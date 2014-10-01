using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class WPPreRegister
    {
        public WPPreRegister()
        {
            CreateDate = DateTime.Now;
        }

        public virtual long Seq { get; protected set; }

        /// <summary>
        /// 13 combine from 
        /// WPCitizenID + Version
        /// </summary>
        public virtual string BarcodeID { get; set; }

        /// <summary>
        /// เลขประจำตัวคนต่างด้าว
        /// </summary>
        public virtual string WPCitizenID { get; set; }

        public virtual string DistrictCode { get; set; }

        public virtual string WPTName { get; set; }
        public virtual string WPTNameEN { get; set; }
        public virtual string WPName { get; set; }
        public virtual string WPNameEN { get; set; }
        public virtual string WPMName { get; set; }
        public virtual string WPMNameEN { get; set; }
        public virtual string WPSName { get; set; }
        public virtual string WPSNameEN { get; set; }

        public virtual string WPNation { get; set; }
        public virtual string WPSex { get; set; }
        public virtual string WPBloodGp { get; set; }
        public virtual DateTime? WPBDate { get; set; }
        public virtual string WPAge { get; set; }

        public virtual string WPRepresentPassport { get; set; }
        public virtual string WPPassportFlag { get; set; }

        public virtual string WPPassportNO { get; set; }
        public virtual string WPPassportIssueAT { get; set; }
        public virtual string WPPassportCountry { get; set; }
        public virtual DateTime? WPPassportIssueDate { get; set; }
        public virtual DateTime? WPPassportExpireDate { get; set; }

        public virtual string WPVisaType { get; set; }
        public virtual string WPVisaNO { get; set; }
        public virtual string WPVisaIssueAT { get; set; }
        public virtual DateTime? WPVisaIssueDate { get; set; }
        public virtual DateTime? WPVisaExpireDate { get; set; }
        public virtual DateTime? WPArrivalDate { get; set; }

        public virtual string WPImmiCheckpoint { get; set; }
        public virtual DateTime? WPStayableDate { get; set; }

        public virtual string WPAddrAbd { get; set; }
        public virtual string WPCountryAbd { get; set; }
        public virtual string WPPCodeAbd { get; set; }
        public virtual string WPHouse { get; set; }
        public virtual string WPMoo { get; set; }
        public virtual string WPBuilding { get; set; }
        public virtual string WPTrok { get; set; }
        public virtual string WPSoi { get; set; }
        public virtual string WPRoad { get; set; }
        public virtual string WPTamb { get; set; }
        public virtual string WPAmp { get; set; }
        public virtual string WPProv { get; set; }
        public virtual string WPPost { get; set; }
        public virtual string WPTel { get; set; }
        public virtual string WPFax { get; set; }
        public virtual string WPMobile { get; set; }
        public virtual string AlienType { get; set; }

        public virtual int? PrefixSeq { get; set; }

        public virtual string WPStatus { get; protected set; }
        public virtual string NewWPID { get; set; }
        public virtual string WPVerify { get; set; }
        public virtual string WPRemark { get; set; }
        public virtual string ParentWPIDType { get; set; }
        public virtual string EMStatus { get; set; }

        public virtual string WPIDTypeDedb { get; set; }
        public virtual string WIFlag { get; set; }
        public virtual string WPIDST { get; set; }
        public virtual string BookIssueProvST { get; set; }

        public virtual string WPIDND { get; set; }
        public virtual int? WPVersionNO { get; set; }

        public virtual string BookFlag { get; set; }
        public virtual string BookIssueProvND { get; set; }
        public virtual DateTime? BookIssueDateND { get; set; }
        public virtual DateTime? BookExpireDateND { get; set; }

        public virtual string RGType { get; set; }
        public virtual string RGWorkType { get; set; }
        public virtual string RGWorkDetail { get; set; }
        public virtual string OccupationSeq { get; set; }

        public virtual string EMID { get; set; }
        public virtual int? EMIDVerNO { get; set; }
        public virtual decimal? EWID { get; set; }
        public virtual decimal? EWIDVerNO { get; set; }
        public virtual decimal? EWID2 { get; set; }
        public virtual decimal? EWID2VerNO { get; set; }
        public virtual decimal? EWID3 { get; set; }
        public virtual decimal? EWID3VerNO { get; set; }
        public virtual decimal? EWID4 { get; set; }
        public virtual decimal? EWID4VerNO { get; set; }
        public virtual decimal? EWID5 { get; set; }
        public virtual decimal? EWID5VerNO { get; set; }
        public virtual decimal? EWID6 { get; set; }
        public virtual decimal? EWID6VerNO { get; set; }
        public virtual decimal? EWID7 { get; set; }
        public virtual decimal? EWID7VerNO { get; set; }
        public virtual decimal? EWID8 { get; set; }
        public virtual decimal? EWID8VerNO { get; set; }
        public virtual decimal? EWID9 { get; set; }
        public virtual decimal? EWID9VerNO { get; set; }

        public virtual string RDCopyPassport { get; set; }
        public virtual string RDCopyLieuPassport { get; set; }
        public virtual string RDCopyEvidence { get; set; }
        public virtual string RDNotHireTH { get; set; }
        public virtual string RDCidTH { get; set; }
        public virtual string RDCpp { get; set; }
        public virtual string RDCcerBfp { get; set; }
        public virtual string RDCerMed { get; set; }
        public virtual string RDPhoto3X4 { get; set; }
        public virtual string RDMapLocWP { get; set; }
        public virtual string RDWPDoc { get; set; }
        public virtual string SDDamageWP { get; set; }
        public virtual string SDPoliceDR { get; set; }
        public virtual string SDPhoto3X4 { get; set; }

        public virtual DateTime CreateDate { get; set; }
        public virtual string CreateBY { get; set; }
        public virtual DateTime? LastUpdate { get; set; }
        public virtual string LastUpdateBY { get; set; }
        public virtual string ComputerNM { get; set; }

        /// <summary>
        /// DRF - Draft
        /// CMP - Completed
        /// </summary>
        public virtual void UpdateWPStatus()
        {
            if (!string.IsNullOrEmpty(WPCitizenID))
            {
                WPStatus = ContWPStatus.Draft;

                if (IsCompleted)
                {
                    WPStatus = ContWPStatus.Completed;
                    IncrementVersion();
                    // gen Barcode
                    MakeBarcode();

                }
            }
        }

        public virtual bool IsCompleted 
        {
            get
            {
                return 
                    // 1.1 -------------------------------------------
                    !string.IsNullOrEmpty(WPTName)
                    && !string.IsNullOrEmpty(WPName)
                    && !string.IsNullOrEmpty(WPSName)

                    && !string.IsNullOrEmpty(WPTNameEN)
                    && !string.IsNullOrEmpty(WPNameEN)
                    && !string.IsNullOrEmpty(WPSNameEN)

                    && !string.IsNullOrEmpty(WPSex)
                    && !string.IsNullOrEmpty(WPNation)
                    // 1.3 ------------------------------------------
                    && !string.IsNullOrEmpty(WPRoad)
                    && !string.IsNullOrEmpty(WPProv)
                    && !string.IsNullOrEmpty(WPAmp)
                    && !string.IsNullOrEmpty(WPTamb)
                    && !string.IsNullOrEmpty(WPMobile)

                    // 2.2 ------------------------------------------
                    && !string.IsNullOrEmpty(WPIDND)
                    && !string.IsNullOrEmpty(BookIssueProvND)
                    && BookIssueDateND.HasValue
                    && BookExpireDateND.HasValue

                    // 3.3 ------------------------------------------
                    && !string.IsNullOrEmpty(OccupationSeq)
                    && !string.IsNullOrEmpty(RGWorkDetail)
                    && !string.IsNullOrEmpty(EMID);
            }
        }

        public virtual void IncrementVersion()
        {
            ++WPVersionNO;
        }

        public virtual void MakeBarcode()
        {
            ulong citizenID;
            string code_citizen = string.Empty;
            if (ulong.TryParse(WPCitizenID, out citizenID))
            {
                code_citizen = citizenID.ToString("0############");
            }
            string code_version = WPVersionNO.GetValueOrDefault().ToString("0##");
            BarcodeID = code_citizen + code_version;
        }
    }
}
