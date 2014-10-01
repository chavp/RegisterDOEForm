using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Tambol
    {
        public virtual long Seq { get; protected set; }

        public virtual string ProvinceCode { get; set; }
        public virtual string AmphurCode { get; set; }

        public virtual string TamCode { get; set; }
        public virtual string TamName { get; set; }
    }
}
