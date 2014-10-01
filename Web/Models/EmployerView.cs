using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoeWeb.Models
{
    public class EmployerView
    {
        public long Seq { get; set; }
        public int EMVersionNO { get; set; }

        public string EMID { get; set; }
        public string EMIDFlg { get; set; }
        public string EMTName { get; set; }
        public string EMName { get; set; }
        public string EMMName { get; set; }
        public string EMSName { get; set; }
        public string EMHouse { get; set; }
        public string EMMoo { get; set; }
        public string EMBuilding { get; set; }
        public string EMSoi { get; set; }
        public string EMRoad { get; set; }
        public string EMVillange { get; set; }
        public string EMTamb { get; set; }
        public string EMTambName { get; set; }
        public string EMAmp { get; set; }
        public string EMAmpName { get; set; }
        public string EMProv { get; set; }
        public string EMProvName { get; set; }
        public string EMPost { get; set; }
        public string EMTel { get; set; }
        public string EMFax { get; set; }
        public string EMMobile { get; set; }

        public int EWID { get; set; }
        public int EWVersionNO { get; set; }
        public int EWID2 { get; set; }
        public int EW2VersionNO { get; set; }
        public int EWID3 { get; set; }
        public int EW3VersionNO { get; set; }
        public int EWID4 { get; set; }
        public int EW4VersionNO { get; set; }
        public int EWID5 { get; set; }
        public int EW5VersionNO { get; set; }
        public int EWID6 { get; set; }
        public int EW6VersionNO { get; set; }
        public int EWID7 { get; set; }
        public int EW7VersionNO { get; set; }
        public int EWID8 { get; set; }
        public int EW8VersionNO { get; set; }
        public int EWID9 { get; set; }
        public int EW9VersionNO { get; set; }

        public string Display 
        {
            get
            {
                return string.Format("{0}: {1} {2} {3}", EMID, EMTName, EMName, EMSName);
            }
            set { } 
        }

        public string FullName
        {
            get
            {
                return string.Format("{0} {1} {2}", EMTName, EMName, EMSName);
            }
            set { }
        }
    }
}