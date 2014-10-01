using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Employer
        : EntityVersion
    {
        public virtual long Seq { get; protected set; }

        public virtual string EMID { get; set; }
        public virtual string EMIDFlg { get; set; }
        public virtual string EMTName { get; set; }
        public virtual string EMName { get; set; }
        public virtual string EMMName { get; set; }
        public virtual string EMSName { get; set; }
        public virtual string EMHouse { get; set; }
        public virtual string EMMoo { get; set; }
        public virtual string EMBuilding { get; set; }
        public virtual string EMSoi { get; set; }
        public virtual string EMRoad { get; set; }
        public virtual string EMVillange { get; set; }
        public virtual string EMTamb { get; set; }
        public virtual string EMAmp { get; set; }
        public virtual string EMProv { get; set; }
        public virtual string EMPost { get; set; }
        public virtual string EMTel { get; set; }
        public virtual string EMFax { get; set; }
        public virtual string EMMobile { get; set; }
        public virtual int EMVersionNO { get; set; }

    }
}
