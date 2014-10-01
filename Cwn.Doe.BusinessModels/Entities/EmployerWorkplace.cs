using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class EmployerWorkplace
    {
        public virtual int EWID { get; protected set; }
        public virtual int Order { get; protected set; }
        public virtual string EMID { get; set; }
        public virtual string BUTypeCode { get; set; }

        /// <summary>
        /// District Code
        /// </summary>
        public virtual string EWLoc { get; set; }

        public virtual string EWName { get; set; }
        public virtual string EWHouse { get; set; }
        public virtual string EWMoo { get; set; }
        public virtual string EWBuilding { get; set; }
        public virtual string EWSoi { get; set; }
        public virtual string EWRoad { get; set; }
        public virtual string EWVillage { get; set; }
        public virtual string EWTamb { get; set; }
        public virtual string EWAmp { get; set; }
        public virtual string EWProv { get; set; }
        public virtual string EWPost { get; set; }
        public virtual string EWTel { get; set; }
        public virtual string EWFax { get; set; }
        public virtual string EWMobile { get; set; }
        public virtual int EWVersionNO { get; set; }

        public virtual void AssignOrder(int order)
        {
            Order = order;
        }

        public virtual void UpOrder()
        {
            --Order;
        }

        public virtual void DownOrder()
        {
           ++Order;
        }
    }
}
