using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoeWeb.Models
{
    public class EmployerWorkplaceView
    {
        public int EWID { get; set; }
        public int Order { get; set; }
        public string EMID { get; set; }
        public string EWHouse { get; set; }
        public string EWBuilding { get; set; }
        public string EWMoo { get; set; }
        public string EWSoi { get; set; }
        public string EWRoad { get; set; }
        public string EWProvName { get; set; }
        public string EWAmpName { get; set; }
        public string EWTamb { get; set; }
        public string EWTambName { get; set; }
        public string EWPost { get; set; }
        public string EWLoc { get; set; }

        public string BUTypeCode { get; set; }
        public string EWName { get; set; }
        public string EWVillage { get; set; }
        public string EWAmp { get; set; }
        public string EWProv { get; set; }
        public string EWTel { get; set; }
        public string EWFax { get; set; }
        public string EWMobile { get; set; }
        public int EWVersionNO { get; set; }

        public string Address
        {
            get
            {
                return string.Format(
                    "{0} {1} {2} {3} {4} {5} {6} {7} {8}",
                    EWHouse, EWBuilding, EWMoo, EWSoi, EWRoad, EWProvName, EWAmpName, EWTambName, EWPost);
            }
            set { }
        }
    }
}